'use client';

import { useEffect } from 'react';
import { Button } from '@/components/common';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <h2 className="text-3xl font-bold text-amber-500 mb-4">Something went wrong</h2>
      <p className="text-lg text-stone-300 mb-8 max-w-md">
        We apologize for the inconvenience. Please try again or contact us if the problem persists.
      </p>
      <div className="flex gap-4">
        <Button
          variant="primary"
          onClick={reset}
        >
          Try again
        </Button>
        <Button
          variant="secondary"
          href="/"
        >
          Go to homepage
        </Button>
      </div>
    </div>
  );
}