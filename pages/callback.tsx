import { useEffect } from 'react';

const Callback = () => {
  useEffect(() => {
    // Send the access token to the parent window
    window.opener.postMessage({ access_token: 'YOUR_ACCESS_TOKEN' }, window.location.origin);
  }, []);

  return <div>Redirecting...</div>;
};

export default Callback;
