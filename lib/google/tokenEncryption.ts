import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY_FOR_ENCRYPTION;

if (!SECRET_KEY) {
  throw new Error("NEXT_PUBLIC_SECRET_KEY_FOR_ENCRYPTION not set")
}

export const encryptToken = (token: string): string => {
  const iv = CryptoJS.lib.WordArray.random(16);
  const encryptedToken = CryptoJS.AES.encrypt(token, CryptoJS.enc.Hex.parse(SECRET_KEY), {
    iv: iv,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.Pkcs7,
  });

  return `${iv.toString(CryptoJS.enc.Hex)}:${encryptedToken.ciphertext.toString(CryptoJS.enc.Hex)}`;
};

export const decryptToken = (encryptedToken: string): string | null => {
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
