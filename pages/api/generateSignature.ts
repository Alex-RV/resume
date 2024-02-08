// pages/api/generateSignature.ts
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { meetingCode, role } = req.body;
      const apiKey = process.env.NEXT_PUBLIC_ZOOM_API_KEY;
      const apiSecret = process.env.NEXT_PUBLIC_ZOOM_API_SECRET;
      if (!apiKey) {
        throw new Error("NEXT_PUBLIC_ZOOM_API_KEY not set")
      }
      if (!apiSecret) {
        throw new Error("NEXT_PUBLIC_ZOOM_API_SECRET not set")
      }

      // Timestamp set to current time in milliseconds, divided by 1000 for seconds
      const timestamp = Math.round(new Date().getTime() / 1000);
      
      // Zoom meeting expiration time (e.g., 2 hours from now)
      const expTime = timestamp + 2 * 60 * 60;

      const payload = {
        iss: apiKey,
        exp: expTime,
        meetingNumber: meetingCode.toString(),
        role: parseInt(role)
      };

      const token = jwt.sign(payload, apiSecret);
      res.status(200).json({ signature: token });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
