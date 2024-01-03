const AUTH_STORAGE_KEY = 'google_auth';

interface AuthInfo {
  accessToken: string;
  refreshToken: string;
}

export const exchangeCodeForToken = async () => {
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
    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;

    // Save the tokens to a secure storage (e.g., local storage)
    saveAuthInfo({ accessToken, refreshToken });

    return accessToken;
  }

  return null;
};

export const getAccessToken = (): string | null => {
  // Retrieve the tokens from the secure storage
  const authInfo = loadAuthInfo();
  return authInfo?.accessToken || null;
};

const saveAuthInfo = (authInfo: AuthInfo): void => {
  // Save the tokens to a secure storage (e.g., local storage)
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authInfo));
};

const loadAuthInfo = (): AuthInfo | null => {
  // Retrieve the tokens from the secure storage
  const storedAuthInfo = localStorage.getItem(AUTH_STORAGE_KEY);
  return storedAuthInfo ? JSON.parse(storedAuthInfo) : null;
};
