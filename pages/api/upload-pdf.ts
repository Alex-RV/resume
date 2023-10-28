import Cors from 'cors';
const vision = require('@google-cloud/vision');
const fs = require("fs");

const cors = Cors({
  methods: ['POST'],
  origin: ['http://localhost:3000', 'https://legal-lingua.vercel.app/'], 
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
          if (result instanceof Error) {
              return reject(result);
          }
          return resolve(result);
      });
  });
}

const credential = JSON.parse(
  Buffer.from(process.env.NEXT_PUBLIC_GOOGLE_SERVICE_KEY, "base64").toString().replace(/\n/g,"")
);
const client = new vision.ImageAnnotatorClient({
  projectId: "raspimon",
  credentials: {
    client_email: credential.client_email,
    private_key: credential.private_key,
  }
});

function isPDF(dataUrl) {
  return dataUrl.startsWith('data:application/pdf;');
}

function isImage(dataUrl) {
  return (
    dataUrl.startsWith('data:image/png;') ||
    dataUrl.startsWith('data:image/jpeg;')
  );
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

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
    const base64Data = dataUrl.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const [result] = await client.textDetection(buffer);
    const detections = result.textAnnotations;
    const textResults = detections.map(text => text.description);
    const jsonResponse = {
      text: textResults,
    };

    console.log(jsonResponse);
    res.status(200).json(jsonResponse);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}