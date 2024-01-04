/**
 * Initiates the OAuth 2.0 authorization code flow in a new window.
 *
 * @param {Window} windowObj - to make sure that it is here
 * @returns {Promise<AuthInfo | null>} A promise that resolves to the authInfo.
 * @throws {Error} If any required environment variables are missing.
 */

import { AuthInfo } from "./types.google";

export default async function getAuthInfoPopUp(windowObj: Window): Promise<AuthInfo | null> {
  if (!process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET) {
    throw new Error("GOOGLE_OAUTH_SECRET not set")
  }
  if (!windowObj) {
    throw new Error("windowObj not provided correctly in getAuthInfoPopUp")
  }
  if (!process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID) {
    throw new Error("GOOGLE_OAUTH_CLIENT_ID not set")
  }
  return new Promise<AuthInfo | null>((resolve) => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID;
    const redirectUri = windowObj.location.origin + '/callback';
    console.log(redirectUri,"it was redirect url and client id is:", clientId)
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=https://www.googleapis.com/auth/calendar&access_type=offline`;

    // const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=https://www.googleapis.com/auth/calendar.readonly`;

    // Open a new window for authentication
    const popup = windowObj.open(authUrl, '_blank', 'width=600,height=600');

    // Listen for messages from the popup
    windowObj.addEventListener('message', async (event) => {
      if (event.origin === windowObj.location.origin) {
        // Close the popup
        popup.close();

        // Extract access token from the response
        const authInfo:AuthInfo = event.data.authInfo;

        // Resolve the promise with the access token
        resolve(authInfo);
      }
    });
  });
}