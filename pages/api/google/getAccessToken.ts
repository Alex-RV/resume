// pages/api/getAccessToken.ts

/**
 * Retrieves an access token from Google using a refresh token.
 *
 * @param {string} refresh_token - from AuthInfo.refresh_token from getAuthInfoPopUp
 * @returns {Promise<string>} A promise that resolves to the access token.
 * @throws {Error} If any required environment variables are missing,
 *                 or if no access token is returned.
 */

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        // Only allow POST requests
        res.status(405).send({ message: 'Only POST requests allowed' });
        return;
    }

    try {
        const { refresh_token } = req.body;
        if (!refresh_token) {
            throw new Error("refresh_token not provided correctly");
        }

        const accessToken = await getAccessTokenFromGoogle(refresh_token);
        res.status(200).json({ access_token: accessToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAccessTokenFromGoogle(refresh_token: string): Promise<string> {
    if (!process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET) {
        throw new Error("GOOGLE_OAUTH_SECRET not set");
    }
    if (!refresh_token) {
        throw new Error("refresh_token not provided correctly");
    }
    if (!process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID) {
        throw new Error("GOOGLE_OAUTH_CLIENT_ID not set");
    }

    const params = new URLSearchParams({
        grant_type: "refresh_token",
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET,
        refresh_token: refresh_token,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
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
        throw new Error(
            `Couldn't get access token: ${JSON.stringify(json, null, 2)}`
        );
    }

    return json.access_token as string;
}

