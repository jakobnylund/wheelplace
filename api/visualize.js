export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
  maxDuration: 60,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image, wheel_image, listing_title, listing_brand } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  try {
    // Step 1: Identify the car make/model from the uploaded photo
    const identifyRes = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        input: [
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text: 'What car make and model is shown in this image? Respond with ONLY a JSON object like {"make":"Audi","model":"Q8","year":"2023"} — nothing else. If you cannot identify the car, respond with {"make":"unknown","model":"unknown","year":"unknown"}.',
              },
              {
                type: 'input_image',
                image_url: image,
              },
            ],
          },
        ],
      }),
    });

    let carInfo = { make: 'unknown', model: 'unknown', year: 'unknown' };
    if (identifyRes.ok) {
      const identifyData = await identifyRes.json();
      const text = identifyData.output?.find(o => o.type === 'message')?.content?.find(c => c.type === 'output_text')?.text || '';
      try {
        const parsed = JSON.parse(text.trim());
        if (parsed.make) carInfo = parsed;
      } catch {}
    }

    // Step 2: Check compatibility
    let compatibility = null;
    if (listing_brand && carInfo.make !== 'unknown') {
      const listingBrandLower = listing_brand.toLowerCase();
      const carMakeLower = carInfo.make.toLowerCase();
      const fits = listingBrandLower === carMakeLower
        || listingBrandLower.includes(carMakeLower)
        || carMakeLower.includes(listingBrandLower);

      if (!fits) {
        compatibility = {
          fits: false,
          car: `${carInfo.make} ${carInfo.model}${carInfo.year !== 'unknown' ? ` (${carInfo.year})` : ''}`,
          listing_brand: listing_brand,
          message: `Dessa hjul är avsedda för ${listing_brand} och passar troligtvis inte din ${carInfo.make} ${carInfo.model}. Du kan ändå se hur de ser ut på din bil.`,
        };
      } else {
        compatibility = {
          fits: true,
          car: `${carInfo.make} ${carInfo.model}${carInfo.year !== 'unknown' ? ` (${carInfo.year})` : ''}`,
          listing_brand: listing_brand,
        };
      }
    }

    // Step 3: Generate the image with wheels swapped
    const prompt = `I have two images. The first image shows wheels/rims/tires from a listing: "${listing_title || 'wheels'}". The second image shows a car.

Please generate a new image of the EXACT same car from the second image (same angle, same background, same lighting, same color, same everything) but with the wheels from the first image replacing the car's current wheels. The wheels should look naturally fitted on the car with correct proportions and perspective. Photorealistic result.`;

    const chatRes = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        input: [
          {
            role: 'user',
            content: [
              { type: 'input_text', text: prompt },
              {
                type: 'input_image',
                image_url: wheel_image,
              },
              {
                type: 'input_image',
                image_url: image,
              },
            ],
          },
        ],
        tools: [{ type: 'image_generation', size: '1024x1024' }],
      }),
    });

    if (!chatRes.ok) {
      const err = await chatRes.json();
      return res.status(500).json({ error: 'OpenAI API error', details: err });
    }

    const data = await chatRes.json();

    let generatedImage = null;
    for (const item of data.output || []) {
      if (item.type === 'image_generation_call') {
        generatedImage = `data:image/png;base64,${item.result}`;
        break;
      }
    }

    if (!generatedImage) {
      return res.status(500).json({ error: 'No image generated', details: data });
    }

    return res.status(200).json({ output: generatedImage, compatibility, car: carInfo });
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}
