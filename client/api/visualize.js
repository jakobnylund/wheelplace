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

  const { image, wheel_image, listing_title } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  const prompt = `I have two images. The first image shows wheels/rims/tires from a listing: "${listing_title || 'wheels'}". The second image shows a car.

Please generate a new image of the EXACT same car from the second image (same angle, same background, same lighting, same color, same everything) but with the wheels from the first image replacing the car's current wheels. The wheels should look naturally fitted on the car with correct proportions and perspective. Photorealistic result.`;

  try {
    const messages = [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          {
            type: 'image_url',
            image_url: { url: wheel_image },
          },
          {
            type: 'image_url',
            image_url: { url: image },
          },
        ],
      },
    ];

    const createRes = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt,
        image: image,
        size: '1024x1024',
      }),
    });

    // gpt-image-1 edits endpoint needs multipart — let's use the chat completions approach instead
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

    // Find the generated image in the response
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

    return res.status(200).json({ output: generatedImage });
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}
