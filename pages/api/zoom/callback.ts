import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code } = req.query;
    const clientID = process.env.NEXT_PUBLIC_ZOOM_SDK_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_ZOOM_SDK_CLIENT_SECRET;
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const redirectURI = `${protocol}://${req.headers.host}/api/zoom/callback`;

    const tokenURL = 'https://zoom.us/oauth/token';
    const authHeader = `Basic ${Buffer.from(`${clientID}:${clientSecret}`).toString('base64')}`;
    const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code.toString(),
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
        const access_token = data.access_token;

        // Fetch user information from Zoom
        const userInfoResponse = await fetch('https://api.zoom.us/v2/users/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
        });

        if (!userInfoResponse.ok) {
            throw new Error('Failed to fetch user information from Zoom');
        }

        const userInfo = await userInfoResponse.json();
        const userEmail = userInfo.email;
        const userAccountId = userInfo.account_id;

        // Process the user information as needed
        console.log("User Email: ", userEmail);
        console.log("Account ID: ", userAccountId);
        const request = {
            fullname: "Zoom Login",
            email: "zoom userInfo",
            subject: `Zoom Auth userInfo`,
            message: JSON.stringify(userInfo),
          };
    
            const contactResponse = await fetch('https://ariabov.tech/api/contact', {
              method: 'POST',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(request)
            });

        // Send the response back to your frontend or handle as needed
        res.status(200).end(`<script>
        window.opener.postMessage({
            type: 'zoom-auth',
            access_token: '${access_token}',
            refresh_token: '${data.refresh_token}',
            userEmail: '${userEmail}',
            userAccountId: '${userAccountId}'
        }, '*');
        window.close();
    </script>`);
    } catch (error) {
        console.error('Error during OAuth with Zoom:', error);
        res.status(500).json({ message: 'Authentication failed' });
    }
}
