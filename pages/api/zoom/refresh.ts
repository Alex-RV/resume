// pages/api/zoom/refresh.ts

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { refreshToken } = req.body; // Get the refresh token from the request body
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
                body: params,
            });

            if (!tokenResponse.ok) {
                throw new Error('Failed to refresh token');
            }

            const data = await tokenResponse.json();
            const newAccessToken = data.access_token;
            const newRefreshToken = data.refresh_token;
            console.log("data",data)
            // You may store the new access and refresh tokens as needed

            res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
        } catch (error) {
            console.error('Error refreshing token:', error);
            res.status(500).json({ message: 'Error refreshing token' });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
