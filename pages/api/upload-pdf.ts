import Cors from 'cors';
const vision = require('@google-cloud/vision');

const cors = Cors({
  methods: ['POST', 'OPTIONS'],
  origin: ['http://localhost:3000', 'https://legal-lingua.vercel.app'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

async function applyCors(req, res) {
  await new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const credential = JSON.parse(
  Buffer.from(process.env.NEXT_PUBLIC_GOOGLE_SERVICE_KEY, "base64").toString().replace(/\n/g, "")
);
const client = new vision.ImageAnnotatorClient({
  projectId: "raspimon",
  credentials: {
    client_email: credential.client_email,
    private_key: credential.private_key,
  }
});

// ... (other imports)

export default async function handler(req, res) {
  await applyCors(req, res);

  if (req.method === 'OPTIONS') { // Preflight request. Reply successfully:
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(404).json({ error: 'Invalid method' });
    return;
  }

  const { dataUrl } = req.body;

  if (!dataUrl) {
    res.status(400).json({ error: 'dataUrl not provided' });
    return;
  }

  if (typeof dataUrl !== 'string') {
    res.status(400).json({ error: 'dataUrl must be a string' });
    return;
  }

  try {
    const base64Prefix = 'data:image/';
    const contentType = dataUrl.match(/^data:([a-zA-Z]+\/[a-zA-Z]+);base64,/);

    if (!contentType) {
      res.status(400).json({ error: 'Invalid dataUrl format' });
      return;
    }

    const imageFormat = contentType[1];
    const base64Data = dataUrl.replace(new RegExp(`^${base64Prefix}${imageFormat};base64,`), '');
    
    const buffer = Buffer.from(base64Data, 'base64');

    const [result] = await client.textDetection(buffer);
    console.log("result", result)

    if (result && result.textAnnotations && result.textAnnotations.length > 0) {
      const fullText = result.textAnnotations[0].description;
      res.status(200).json({ text: fullText });
    } else {
      res.status(400).json({ error: 'No text found in the image' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
}
