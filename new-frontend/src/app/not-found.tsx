import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4 p-6 bg-white rounded-lg shadow-md text-center">
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 mx-auto text-gp-gray"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-gp-dark mb-2">404</h1>
        
        <h2 className="text-xl font-semibold text-gp-dark mb-2">
          Página no encontrada
        </h2>
        
        <p className="text-gp-gray mb-6">
          La página que estás buscando no existe o ha sido movida.
        </p>
        
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-gp-pastel text-white rounded-lg hover:bg-gp-pastel/90 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
