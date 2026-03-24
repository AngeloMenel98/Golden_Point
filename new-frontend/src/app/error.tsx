'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4 p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          
          <h2 className="text-xl font-bold text-gp-dark mb-2">
            Algo salió mal
          </h2>
          
          <p className="text-gp-gray mb-6">
            {error.message || 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.'}
          </p>
          
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-gp-pastel text-white rounded-lg hover:bg-gp-pastel/90 transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    </div>
  );
}
