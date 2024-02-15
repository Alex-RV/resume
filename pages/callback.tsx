import React, { useEffect } from 'react';
import Container from '../components/Container';

export default function Callback() {
  const handleTokenExchange = async () => {
    try {
      const code = new URLSearchParams(window.location.search).get('code');
      console.log("code on the front", code);
      const response = await fetch(`/api/google/exchangeCodeForAuthInfo?code=${code}`);
      const authInfo = await response.json();
  
      if (authInfo.error) {
        console.error('Error:', authInfo.error);
      } else {
        // Success - handle the token
        console.log("Token received:", authInfo);
        // Post the token to the parent window
        window.opener.postMessage({ authInfo: authInfo }, window.location.origin);

        // Close the current window
        window.close();
      }
    } catch (error) {
      console.error('Error exchanging code for token:', error);
    }
  };
  
  useEffect(() => {
    handleTokenExchange();
  }, []);
  
  return (
    <Container>
        <div>Redirecting...</div>
    </Container>
  )
}
