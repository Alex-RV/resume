const express = require('express');
const router = express.Router();
const axios = require('axios');
const querystring = require('querystring');

// Retrieves events from the primary calendar for the authenticated user.
//
// @param {string} accessToken - The access token obtained from getAccessToken token function.
// @returns {Promise<object[]>} A promise that resolves to an array of events.
// @throws {Error} If the request to the Google Calendar API fails or if no events are returned.
router.get('/getEvents', async (req, res) => {
  const accessToken = req.query.accessToken;

  if (!accessToken) {
    res.status(400).send("accessToken not provided correctly");
    return;
  }

  try {
    const response = await axios.get("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const json = response.data;

    if (!json.items || json.items.length === 0) {
      throw new Error(`No events found: ${JSON.stringify(json, null, 2)}`);
    }

    // Extract events from the list
    const events = json.items;

    res.status(200).json(events);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  throw new Error("OAuth client ID or secret is not set");
}

// Redirect user to Google's OAuth 2.0 server
router.get('/auth/google', (req, res) => {
  const redirectUri = `${req.protocol}://${req.get('host')}/auth/google/callback`;
  const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=https://www.googleapis.com/auth/calendar&access_type=offline&prompt=consent`;

  res.redirect(authUrl);
});

// Google OAuth callback endpoint
router.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;
  const redirectUri = `${req.protocol}://${req.get('host')}/auth/google/callback`;

  // Exchange code for tokens
  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', querystring.stringify({
      code: code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const authInfo = response.data;

    // You might want to redirect or handle the authInfo here
    res.json(authInfo);
  } catch (error) {
    res.status(500).send('Authentication failed');
  }
});

const CryptoJS = require('crypto-js');

const SECRET_KEY = process.env.SECRET_KEY_FOR_ENCRYPTION;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY_FOR_ENCRYPTION not set");
}

const encryptToken = (token) => {
  const iv = CryptoJS.lib.WordArray.random(16);
  const encryptedToken = CryptoJS.AES.encrypt(token, CryptoJS.enc.Hex.parse(SECRET_KEY), {
    iv: iv,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.Pkcs7,
  });

  return `${iv.toString(CryptoJS.enc.Hex)}:${encryptedToken.ciphertext.toString(CryptoJS.enc.Hex)}`;
};

const decryptToken = (encryptedToken) => {
  try {
    const [ivString, tokenString] = encryptedToken.split(':');
    const iv = CryptoJS.enc.Hex.parse(ivString);
    const ciphertext = CryptoJS.enc.Hex.parse(tokenString);

    const decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, CryptoJS.enc.Hex.parse(SECRET_KEY), {
      iv: iv,
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Error decrypting token:', error);
    return null;
  }
};

module.exports = {
  encryptToken,
  decryptToken
};

module.exports = router;