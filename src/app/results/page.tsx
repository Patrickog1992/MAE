
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page is deprecated. The logic has been moved to /analysis to avoid sessionStorage issues on mobile.
// It now just redirects to the home page if a user lands on it directly.
export default function ResultsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Redirecionando...</p>
      </div>
  );
}

    