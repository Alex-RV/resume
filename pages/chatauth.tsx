import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function chatauth() {
  const router = useRouter();

  useEffect(() => {
    // Redirecting to the specified URL
    router.replace('http://127.0.0.1:5000/');
  }, [router]);

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
};