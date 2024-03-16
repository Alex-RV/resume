// pages/api/zoom/getNewAccessToken.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { refreshToken } = req.body;
        const clientID = process.env.NEXT_PUBLIC_ZOOM_SDK_CLIENT_ID;
        const clientSecret = process.env.NEXT_PUBLIC_ZOOM_SDK_CLIENT_SECRET;

        const tokenURL = 'https://zoom.us/oauth/token';
        const authHeader = `Basic ${Buffer.from(`${clientID}:${clientSecret}`).toString('base64')}`;
        const params = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });

        try {
            const tokenResponse = await fetch(tokenURL, {
                method: 'POST',
                headers: {
                    Authorization: authHeader,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString(),
            });

            if (!tokenResponse.ok) {
                throw new Error('Failed to refresh access token');
            }

            const data = await tokenResponse.json();
            res.status(200).json({ accessToken: data.access_token });
        } catch (error) {
            console.error('Error fetching new access token:', error);
            res.status(500).json({ message: 'Error fetching new access token' });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
