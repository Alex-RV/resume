// pages/api/exchangeCodeForAuthInfo.ts

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

  const code = req.query.code as string;

  if (!code) {
    res.status(400).json({ error: 'Code not provided' });
    return;
  }

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_SECRET;
  const redirectUri = `${req.headers.origin}/callback`;

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

    if (data.error) {
      res.status(400).json({ error: data.error });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Google API' });
  }
}
