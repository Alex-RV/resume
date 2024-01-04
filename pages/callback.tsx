import React, { useEffect } from 'react'
import { exchangeCodeForToken } from '../lib/google/exchangeCodeForToken'
import Container from '../components/Container';

export default function Callback() {
    useEffect(() => {
        const handleTokenExchange = async () => {
          try {
            const authInfo = await exchangeCodeForToken(window);
    
            // Send the access token to the parent window
            window.opener.postMessage({ authInfo: authInfo }, window.location.origin);
          } catch (error) {
            console.error('Error exchanging code for token:', error);
          }
        };
    
        handleTokenExchange();
      }, []);

  return (
    <Container>
        <div>Redirecting...</div>
    </Container>
  )
}
