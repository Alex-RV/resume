// pages/api/zoom/zoom-meeting-end.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const event = req.body;

        if (event.event === 'meeting.ended') {
            console.log('Meeting Ended:', event.payload.object);

            let data = {
                fullname: "Zoom",
                email: "zoom",
                subject: "meeting end",
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
            res.status(200).json({ message: 'Event not related to meeting end' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
