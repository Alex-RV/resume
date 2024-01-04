/**
 * Exchanges code which you got from user's auth window to authentication data(authInfo)
 *
 * @param {Window} window - window to make sure.
 * @returns {Promise<string>} A promise that resolves to the access token.
 * @throws {Error} If any required environment variables are missing,
 *                 or if no access token is returned.
 */

export const exchangeCodeForAuthInfo = async (window) => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET) {
        throw new Error("GOOGLE_OAUTH_SECRET not set")
      }
    if (!window) {
        throw new Error("window not provided correctly in exchangeCodeForAuthInfo")
      }
    if (!process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID) {
        throw new Error("GOOGLE_OAUTH_CLIENT_ID not set")
      }

  const code = new URLSearchParams(window.location.search).get('code');

  if (!code) {
    throw new Error("code not extracted correctly in exchangeCodeForAuthInfo")
  }

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