import axios from 'axios';

export default async function handler(req, res) {
  const { data } = req.query;

  // URL of the Flask endpoint
  const flaskEndpoint = 'http://localhost:5000/callback4openai';

  try {
    // Forward the request to Flask server for processing
    const response = await axios.post(flaskEndpoint, `data=${data}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Flask will handle the redirection after processing
    res.redirect(response.request.res.responseUrl);
  } catch (error) {
    // Log the error and return a server error status
    console.error('Error redirecting to Flask:', error);
    res.status(500).json({ error: 'Error processing your request' });
  }
}
