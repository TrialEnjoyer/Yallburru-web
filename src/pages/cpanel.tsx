import { useEffect } from 'react';
import Head from 'next/head';

export default function CPanel() {
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      // Redirect to cPanel
      window.location.replace('http://110.232.143.63:2083');
    }
  }, []);

  // Return null or a loading message while redirecting
  return (
    <>
      <Head>
        <title>Redirecting to cPanel...</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Redirecting to cPanel...</div>
      </div>
    </>
  );
}
