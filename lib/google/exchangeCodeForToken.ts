export const exchangeCodeForToken = async (window) => {
  const code = new URLSearchParams(window.location.search).get('code');

  if (code) {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET;
    const redirectUri = window.location.origin + '/callback';

    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const data = await response.json();

    return data;
  }

  return null;
};