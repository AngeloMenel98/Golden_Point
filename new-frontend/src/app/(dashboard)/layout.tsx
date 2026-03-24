import { Suspense } from 'react';
import NavBar from '@/components/navbar/NavBar';
import { TournamentProvider } from '@/context/TournamentContext';

function DashboardLoadingFallback() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gp-pastel"></div>
      <span className="ml-3 font-medium text-gp-dark">Cargando...</span>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />
      <TournamentProvider>
        <main className="flex-1 p-5 lg:p-10 max-w-7xl mx-auto w-full">
          <Suspense fallback={<DashboardLoadingFallback />}>
            {children}
          </Suspense>
        </main>
      </TournamentProvider>
    </div>
  );
}
