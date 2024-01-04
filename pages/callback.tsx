import React, { useEffect } from 'react'
import { exchangeCodeForAuthInfo } from '../lib/google/exchangeCodeForAuthInfo'
import Container from '../components/Container';

export default function Callback() {
    useEffect(() => {
        const handleTokenExchange = async () => {
          try {
            const authInfo = await exchangeCodeForAuthInfo(window);
    
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
