export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image, wheel_style } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
  if (!REPLICATE_API_TOKEN) {
    return res.status(500).json({ error: 'Replicate API token not configured' });
  }

  const wheelDesc = wheel_style || 'sleek 19-inch gunmetal alloy sport rims with low-profile performance tires';
  const prompt = `Replace only the wheels and rims on this car with: ${wheelDesc}. Keep the rest of the car, background, lighting, and angle completely identical. Only the wheels and tires should change. Photorealistic result.`;

  try {
    // If image is base64 data URL, upload to Replicate's file hosting first
    let imageUrl = image;
    if (image.startsWith('data:')) {
      const base64Data = image.split(',')[1];
      const mimeMatch = image.match(/data:([^;]+);/);
      const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
      const ext = mime.split('/')[1] || 'jpg';

      // Upload via multipart form
      const fileBuffer = Buffer.from(base64Data, 'base64');
      const boundary = '----ReplicateUpload' + Date.now();
      const fileName = `car.${ext}`;
      const bodyParts = [
        `--${boundary}\r\n`,
        `Content-Disposition: form-data; name="content"; filename="${fileName}"\r\n`,
        `Content-Type: ${mime}\r\n\r\n`,
      ];
      const header = Buffer.from(bodyParts.join(''));
      const footer = Buffer.from(`\r\n--${boundary}--\r\n`);
      const multipartBody = Buffer.concat([header, fileBuffer, footer]);

      const uploadRes = await fetch('https://api.replicate.com/v1/files', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
        },
        body: multipartBody,
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.text();
        return res.status(500).json({ error: 'File upload failed', details: err });
      }

      const uploadData = await uploadRes.json();
      imageUrl = uploadData.urls.get;
    }

    // Create prediction using Replicate's flux-kontext-pro model
    const createRes = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: '897a70f5a7dbd8a0611413b3b98cf417b45f266bd595c571a22947619d9ae462',
        input: {
          prompt,
          input_image: imageUrl,
          aspect_ratio: 'match_input_image',
          safety_tolerance: 5,
        },
      }),
    });

    if (!createRes.ok) {
      const err = await createRes.json();
      return res.status(500).json({ error: 'Replicate API error', details: err });
    }

    const prediction = await createRes.json();

    // Poll for result
    let result = prediction;
    while (result.status !== 'succeeded' && result.status !== 'failed') {
      await new Promise((r) => setTimeout(r, 1500));
      const pollRes = await fetch(result.urls.get, {
        headers: { 'Authorization': `Bearer ${REPLICATE_API_TOKEN}` },
      });
      result = await pollRes.json();
    }

    if (result.status === 'failed') {
      return res.status(500).json({ error: 'Generation failed', details: result.error });
    }

    return res.status(200).json({ output: result.output });
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}
