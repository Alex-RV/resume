import React, { useEffect } from 'react'
import { exchangeCodeForToken } from '../lib/google/exchangeCodeForToken'

export default function Callback() {
    useEffect(() => {
        const handleTokenExchange = async () => {
          try {
            const accessToken = await exchangeCodeForToken();
    
            // Send the access token to the parent window
            window.opener.postMessage({ access_token: accessToken }, window.location.origin);
          } catch (error) {
            console.error('Error exchanging code for token:', error);
          }
        };
    
        handleTokenExchange();
      }, []);

  return (
    <div>Redirecting...</div>
  )
}
