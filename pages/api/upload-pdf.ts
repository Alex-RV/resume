const vision = require('@google-cloud/vision');
const fs = require("fs");
console.log("KEY",process.env.GOOGLE_SERVICE_KEY);
const credential = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_KEY, "base64").toString().replace(/\n/g,"")
);
const client = new vision.ImageAnnotatorClient({
  projectId: "raspimon",
  credentials: {
    client_email: credential.client_email,
    private_key: credential.private_key,
  }
});

function isPDF(dataUrl) {
  // Check if the file starts with the PDF signature
  return dataUrl.startsWith('data:application/pdf;');
}

function isImage(dataUrl) {
  // Check if the file is an image (PNG or JPEG)
  return (
    dataUrl.startsWith('data:image/png;') ||
    dataUrl.startsWith('data:image/jpeg;')
  );
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { dataUrl } = req.body;

      // let buffer;
      // if (isPDF(dataUrl)) {
      //   const base64Data = dataUrl.replace(/^data:application\/pdf;base64,/, '');
      //   buffer = Buffer.from(base64Data, 'base64');
      // } else if (isImage(dataUrl)) {
      //   const base64Data = dataUrl.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
      //   buffer = Buffer.from(base64Data, 'base64');
      // } else {
      //   // Unsupported file type
      //   res.status(400).json({ error: 'Unsupported file type' });
      //   return;
      // }
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
  } else {
    res.status(404).json({ error: 'Invalid method' });
  }
}
