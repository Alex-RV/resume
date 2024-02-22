// pages/api/zooom/auth.ts
export default function handler(req, res) {
    const clientID = process.env.NEXT_PUBLIC_ZOOM_SDK_CLIENT_ID;
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

    const redirectUri = `${protocol}://${req.headers.host}/api/zoom/callback`;
    console.log("redirectUri: ", redirectUri)

    const zoomAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectUri}`;

    res.redirect(zoomAuthUrl);
}
