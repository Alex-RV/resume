'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Chatauth() {
  const router = useRouter();

  useEffect(() => {
    router.replace('http://127.0.0.1:8000');
  }, [router]);

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
};