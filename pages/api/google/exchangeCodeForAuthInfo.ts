// pages/api/exchangeCodeForAuthInfo.ts

/**
 * Exchanges code which you got from user's auth window to authentication data(authInfo)
 *
 * @param {Window} window - window to make sure.
 * @returns {Promise<string>} A promise that resolves to the access token.
 * @throws {Error} If any required environment variables are missing,
 *                 or if no access token is returned.
 */

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET) {
    res.status(500).json({ error: 'NEXT_PUBLIC_GOOGLE_OAUTH_SECRET not set' });
    return;
  }

  if (!process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID) {
    res.status(500).json({ error: 'NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID not set' });
    return;
  }

  if (!process.env.NEXT_PUBLIC_GOOGLE_AUTH_CALLBACK_URL) {
    res.status(500).json({ error: 'NEXT_PUBLIC_GOOGLE_AUTH_CALLBACK_URL not set' });
    return;
  }

  if (!process.env.NODE_ENV) {
    res.status(500).json({ error: 'NODE_ENV not set' });
    return;
  }

  const code = req.query.code as string;

  if (!code) {
    res.status(400).json({ error: 'Code not provided' });
    return;
  }

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET;
  const callbackURL = process.env.NEXT_PUBLIC_GOOGLE_AUTH_CALLBACK_URL;

  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  const redirectUri = `${protocol}://${req.headers.host}/${callbackURL}`;

  const tokenUrl = 'https://oauth2.googleapis.com/token';

  try {
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
    console.log("Data", data)

    if (data.error) {
      res.status(400).json({ error: data.error });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Google API' });
  }
}
