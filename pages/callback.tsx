import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      const code = router.query.code as string;

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
        const accessToken = data.access_token;

        // Send the access token to the parent window
        window.opener.postMessage({ access_token: accessToken }, window.location.origin);
      }
    };

    exchangeCodeForToken();
  }, [router.query.code]);

  return <div>Redirecting...</div>;
};

export default Callback;
