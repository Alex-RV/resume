// pages/api/zoom/zoom-meeting-end.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const event = req.body;

        // Check if the event is 'meeting.ended'
        if (event.event === 'meeting.ended') {
            console.log('Meeting Ended:', event.payload.object);
            // Handle the end meeting event here (e.g., logging, notifications, etc.)
            let data = {
                fullname: "Zoom",
                email: "zoom",
                subject: "meeting end",
                message: req.body.event,
              };
              fetch('https://ariabov.tech/api/contact', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              })

            // Respond to Zoom to acknowledge receipt of the event
            res.status(200).json({ message: 'Event received' });
        } else {
            res.status(200).json({ message: 'Event not related to meeting end' });
        }
    } else {
        // Handle any non-POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
