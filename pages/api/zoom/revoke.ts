// pages/api/zoom/revoke.ts
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { accessToken } = req.body;

        const revokeURL = 'https://zoom.us/oauth/revoke';
        const credentials = `${process.env.NEXT_PUBLIC_ZOOM_SDK_CLIENT_ID}:${process.env.NEXT_PUBLIC_ZOOM_SDK_SECRET}`;
        // const authHeader = `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_ZOOM_SDK_CLIENT_ID}:${process.env.NEXT_PUBLIC_ZOOM_SDK_SECRET}`).toString('base64')}`;

        const authHeader = `Basic ${Buffer.from(credentials).toString('base64')}`;

        try {
            const response = await fetch(revokeURL, {
                method: 'POST',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `token=${accessToken}`,
            });

            if (response.status === 200) {
                res.status(200).json({ message: 'Token revoked successfully' });
            } else {
                // You might want to log response for debugging
                console.log('Response Status:', response.status, 'Response Text:', await response.text());
                res.status(response.status).json({ message: 'Failed to revoke token', response });
            }
        } catch (error) {
            console.error('Error revoking token:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
