export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      grant_type,
      client_id,
      client_secret,
      code,
      redirect_uri,
    } = req.body;

    // Perform any necessary validation or checks on the received parameters

    try {
      // Make a request to the ChatGPT OAuth endpoint
      const response = await fetch(redirect_uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type,
          client_id,
          client_secret,
          code,
          redirect_uri,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { access_token, token_type, refresh_token, expires_in } = data;

        // Redirect the user back to the chat with the authentication information
        const chatRedirectUrl = `https://chat.openai.com/aip/g-f0016b654f2469cf1a8db770d63f3958dd029fda/oauth/callback?access_token=${access_token}&token_type=${token_type}&refresh_token=${refresh_token}&expires_in=${expires_in}`;
        res.redirect(chatRedirectUrl);
      } else {
        // Handle error case when the ChatGPT OAuth endpoint returns an error
        console.error('OAuth request failed:', response.status);
        res.status(500).json({ error: 'OAuth request failed' });
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error during OAuth request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}