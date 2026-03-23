import NavBar from '@/components/navbar/NavBar';
import { TournamentProvider } from '@/context/TournamentContext';

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
          {children}
        </main>
      </TournamentProvider>
    </div>
  );
}
