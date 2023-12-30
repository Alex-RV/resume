// lib/google/auth.js
/**
 * Initiates the OAuth 2.0 authorization code flow in a new window.
 *
 * @returns {Promise<string>} A promise that resolves to the access token.
 * @throws {Error} If any required environment variables are missing.
 */
export default async function getAccessTokenPopUp(): Promise<string> {
    if (!process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID) {
      throw new Error("GOOGLE_OAUTH_CLIENT_ID not set");
    }
  
    const redirectUri = encodeURIComponent(window.location.origin + "/oauth-callback");
    const authorizationUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=https://www.googleapis.com/auth/calendar.readonly`;
  
    const authWindow = window.open(authorizationUrl, '_blank');
  
    return new Promise((resolve, reject) => {
      const handleTokenResponse = (event) => {
        if (event.source === authWindow) {
          window.removeEventListener('message', handleTokenResponse);
  
          authWindow.close();
  
          const { authorizationCode, error } = event.data;
          if (authorizationCode) {
            exchangeCodeForAccessToken(authorizationCode)
              .then(resolve)
              .catch(reject);
          } else {
            reject(error || 'Failed to obtain authorization code');
          }
        }
      };
  
      window.addEventListener('message', handleTokenResponse);
    });
  }
  
  /**
   * Exchanges the authorization code for an access token.
   *
   * @param {string} code - The authorization code obtained from the callback URL.
   * @returns {Promise<string>} A promise that resolves to the access token.
   * @throws {Error} If the request to exchange the code fails or if no access token is returned.
   */
  async function exchangeCodeForAccessToken(code: string): Promise<string> {
    if (!process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET) {
      throw new Error("GOOGLE_OAUTH_SECRET not set");
    }
    if (!process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID) {
      throw new Error("GOOGLE_OAUTH_CLIENT_ID not set");
    }
  
    const params = new URLSearchParams({
      code,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET,
      redirect_uri: window.location.origin + "/oauth-callback",
      grant_type: "authorization_code",
    });
  
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
      cache: "no-cache",
    });
  
    const json = await response.json();
  
    if (!json.access_token) {
      throw new Error(`Couldn't get access token: ${JSON.stringify(json, null, 2)}`);
    }
  
    return json.access_token as string;
  }
  