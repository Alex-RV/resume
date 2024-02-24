// pages/api/zooom/callback.ts

export default async function handler(req, res) {
    const { code } = req.query;
    const clientID = process.env.NEXT_PUBLIC_ZOOM_SDK_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_ZOOM_SDK_SECRET;
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

    const redirectURI = `${protocol}://${req.headers.host}/api/zoom/callback`;

    const tokenURL = 'https://zoom.us/oauth/token';
    const authHeader = `Basic ${Buffer.from(`${clientID}:${clientSecret}`).toString('base64')}`;
    const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectURI,
    });

    try {
        const tokenResponse = await fetch(tokenURL + '?' + params, {
            method: 'POST',
            headers: {
                Authorization: authHeader,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (!tokenResponse.ok) {
            throw new Error('OAuth token exchange failed');
        }

        const data = await tokenResponse.json();
        const refresh_token = data.refresh_token;
        const access_token = data.access_token;

        console.log("data",data)
        // Use accessToken for further Zoom API calls
        res.status(200).end(`<script>window.opener.postMessage({ refresh_token: '${refresh_token}', access_token:'${access_token}' }, '*'); window.close();</script>`);
    } catch (error) {
        console.error('Error during OAuth with Zoom:', error);
        res.status(500).json({ message: 'Authentication failed' });
    }
}
