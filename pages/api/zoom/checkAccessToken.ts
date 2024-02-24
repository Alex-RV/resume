// api/zoom/checkAccessToken.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // const { accessToken } = req.body;
        const accessToken = req.headers.authorization?.split(' ')[1];
        console.log("accessToken", accessToken,"req.headers ", req.headers)

        if (!accessToken) {
            return res.status(401).json({ message: 'No access token provided' });
        }

        try {
            const userProfileResponse = await fetch('https://api.zoom.us/v2/users/me', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (userProfileResponse.ok) {
                res.status(200).json({ message: 'Access token is valid' });
            } else {
                res.status(401).json({ message: `Access token is invalid or expired  ${await userProfileResponse.json()}` });
            }
        } catch (error) {
            console.error('Error checking access token validity:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', 'GET');
        res.status(405).end('Method Not Allowed');
    }
}
