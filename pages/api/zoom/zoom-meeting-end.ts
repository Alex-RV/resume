// pages/api/zoom/zoom-meeting-end.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
    const event = req.body;

    // Zoom Verification Token from your Zoom App
    const zoomVerificationToken = process.env.NEXT_PUBLIC_ZOOM_TOKEN;

    // The `authorization` header sent by Zoom
    const signature = req.headers['authorization'];

    // Construct the verification signature using the payload and your verification token
    const expectedSignature = 'v0=' + crypto
      .createHmac('sha256', zoomVerificationToken)
      .update(JSON.stringify(req.body))
      .digest('hex');

    // Check if the computed signature matches the header from Zoom
    if (signature !== expectedSignature) {
      res.status(403).json({ message: 'Invalid signature' });
      return;
    }

    // Verification process to respond to Zoom's challenge request
    if (event.event === 'endpoint.url_verification') {
      res.status(200).json({ challenge: event.payload.challenge });
      return;
    }

    console.log(event.event);

    if (event.event === 'meeting.ended' || event.event === 'meeting.started') {
      console.log('Meeting ', event.event, ": ", event.payload.object);

      let data = {
        fullname: "Zoom",
        email: "zoom",
        subject: event.event,
        message: JSON.stringify(event.payload.object),
      };

      try {
        const contactResponse = await fetch('https://ariabov.tech/api/contact', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (contactResponse.status === 200) {
          console.log('Response succeeded!');
        } else {
          console.log('Response not succeeded, status code:', contactResponse.status);
        }
      } catch (error) {
        console.error('Error sending request to /api/contact:', error);
      }

      res.status(200).json({ message: 'Event received' });
    } else {
      res.status(200).json({ message: 'Event not related to the requested event types' });
    }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
}
