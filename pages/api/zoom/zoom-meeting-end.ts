// pages/api/zoom/zoom-meeting-end.ts
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const timestamp = req.headers['x-zm-request-timestamp'] as string;
    const signature = req.headers['x-zm-signature'] as string;
    const zoomWebhookSecretToken = process.env.NEXT_PUBLIC_ZOOM_SDK_SECRET || '';

    // Construct the message string
    const message = `v0:${timestamp}:${JSON.stringify(req.body)}`;

    // Verify the signature
    const hashForVerify = crypto
      .createHmac('sha256', zoomWebhookSecretToken)
      .update(message)
      .digest('hex');
    const computedSignature = `v0=${hashForVerify}`;

    // const data = {
    //   fullname: "Zoom Event Subscribed",
    //   email: "event@zoom.us",
    //   subject: `Zoom Meeting ${req.body.event}`,
    //   message: `First point of entering the zoom endpoint. Data: event type:${req.body.event}, signature:${signature}, computedSignature: ${computedSignature}, other data: ${JSON.stringify(req.body.payload.object)}`,
    // };

    // const contactResponse = await fetch('https://ariabov.tech/api/contact', {
    //       method: 'POST',
    //       headers: {
    //         'Accept': 'application/json, text/plain, */*',
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(data)
    //     });

    // Check if the signature matches
    if (signature !== computedSignature) {
      res.status(401).json({ message: 'Unauthorized request to Zoom Webhook.' });
      return;
    }

    // Zoom is validating that you control the webhook endpoint
    if (req.body.event === 'endpoint.url_validation') {
      const plainToken = req.body.payload.plainToken;
      const hashForValidate = crypto
        .createHmac('sha256', zoomWebhookSecretToken)
        .update(plainToken)
        .digest('hex');

      res.status(200).json({
        plainToken,
        encryptedToken: hashForValidate
      });
      return;
    }

    if (req.body.event) {
      const data = {
        fullname: `Zoom Event: ${req.body.event}`,
        email: "event@zoom.us",
        subject: `Zoom Meeting ${req.body.payload.object.topic}`,
        message: JSON.stringify(req.body),
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
          console.log('Notification sent successfully');
        } else {
          console.error('Failed to send notification', contactResponse.status);
        }
      } catch (error) {
        console.error('Error sending request to /api/contact', error);
      }

      res.status(200).json({ message: 'Zoom event processed.' });
    } else {
      // If the event type is unrecognized, log it and respond accordingly
      console.log('Received unrecognized Zoom event type:', req.body.event);
      res.status(200).json({ message: 'Unrecognized event type received.' });
    }
  } else {
    // If the request method is not POST, return 405 Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
