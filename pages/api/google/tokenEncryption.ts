// pages/api/google/tokenEncryption.ts 

import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.SECRET_KEY_FOR_ENCRYPTION;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY_FOR_ENCRYPTION not set");
}

export const encryptToken = (req, res) => {
  const token = req.body.token;
  if (!token) {
    res.status(400).json({ error: 'Token not provided' });
    return;
  }

  const iv = CryptoJS.lib.WordArray.random(16);
  const encryptedToken = CryptoJS.AES.encrypt(token, CryptoJS.enc.Hex.parse(SECRET_KEY), {
    iv: iv,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.Pkcs7,
  });

  res.status(200).json({ encryptedToken: `${iv.toString(CryptoJS.enc.Hex)}:${encryptedToken.ciphertext.toString(CryptoJS.enc.Hex)}` });
};

export const decryptToken = (req, res) => {
  const encryptedToken = req.body.encryptedToken;
  if (!encryptedToken) {
    res.status(400).json({ error: 'Encrypted token not provided' });
    return;
  }

  try {
    const [ivString, tokenString] = encryptedToken.split(':');
    const iv = CryptoJS.enc.Hex.parse(ivString);
    const ciphertext = CryptoJS.enc.Hex.parse(tokenString);

    const decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, CryptoJS.enc.Hex.parse(SECRET_KEY), {
      iv: iv,
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.Pkcs7,
    });

    res.status(200).json({ decryptedToken: decrypted.toString(CryptoJS.enc.Utf8) });
  } catch (error) {
    console.error('Error decrypting token:', error);
    res.status(500).json({ error: 'Error decrypting token' });
  }
};

// Sample API usage endpoint
export default function handler(req, res) {
  switch(req.method) {
    case 'POST':
      if (req.query.action === 'encrypt') {
        encryptToken(req, res);
      } else if (req.query.action === 'decrypt') {
        decryptToken(req, res);
      } else {
        res.status(400).json({ error: 'Invalid action' });
      }
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}
