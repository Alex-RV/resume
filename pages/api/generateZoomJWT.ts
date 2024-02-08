// pages/api/generateZoomJWT.ts
import { KJUR } from 'jsrsasign';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { sdkClientId, sdkSecret, meetingNumber, role } = req.body;

    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2; // JWT valid for 2 hours
    const oHeader = { alg: 'HS256', typ: 'JWT' };
    const oPayload = {
      sdkKey: sdkClientId,
      mn: meetingNumber,
      role: role,
      iat: iat,
      exp: exp,
      tokenExp: exp
    };

    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret);

    res.status(200).json({ jwt: sdkJWT });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
