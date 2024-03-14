// pages/api/zoom/zoom-meeting-start.ts

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Validate the Zoom verification token
        const verificationToken = process.env.NEXT_PUBLIC_ZOOM_TOKEN;
        const receivedToken = req.headers['authorization'];

        if (verificationToken !== receivedToken) {
            return res.status(403).send('Invalid request.');
        }

        // Handle the Zoom event
        if (req.body.event === 'meeting.started') {
            console.log('Meeting has started:', req.body.payload.object.id);
            let data = {
                fullname: "Zoom",
                email: "zoom",
                subject: "meeting start",
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
        }

        res.status(200).json({ message: 'Webhook received' });
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
