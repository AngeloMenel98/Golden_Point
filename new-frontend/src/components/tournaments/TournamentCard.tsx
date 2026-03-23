'use client';

import { useRouter } from 'next/navigation';
import { Tournament, getStatusLabel, TournamentStatus } from '@/entities/Tournament';
import { useTournament } from '@/context/TournamentContext';

interface TournamentCardProps {
  tournament: Tournament;
  isAdmin: boolean;
  onDelete?: (id: string) => void;
  onStart?: (id: string) => void;
  onClick?: (tournament: Tournament) => void;
}

export function TournamentCard({ tournament, isAdmin, onDelete, onStart, onClick }: TournamentCardProps) {
  const router = useRouter();
  const { setCurrentTournament } = useTournament();

  const handleClick = () => {
    setCurrentTournament(tournament);
    if (onClick) {
      onClick(tournament);
    }
    router.push(`/tournaments/${tournament.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(tournament.id);
    }
  };

  const handleStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onStart) {
      onStart(tournament.id);
    }
  };

  const getStatusBadgeClass = (status: TournamentStatus) => {
    switch (status) {
      case TournamentStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case TournamentStatus.IN_PROGRESS:
        return 'bg-green-100 text-green-800 border-green-300';
      case TournamentStatus.FINISHED:
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const isPending = tournament.status === TournamentStatus.PENDING;
  const canStart = isAdmin && isPending;
  const canDelete = isAdmin;

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gp-gray-light hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gp-dark truncate flex-1">
            {tournament.name}
          </h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadgeClass(tournament.status as TournamentStatus)}`}>
            {getStatusLabel(tournament.status)}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gp-gray mb-3">
          <div>
            <span className="font-medium">Master Score:</span> {tournament.masterScore}
          </div>
          <div>
            <span className="font-medium">Categorías:</span> {tournament.categories?.length || 0}
          </div>
        </div>

        {tournament.categories && tournament.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tournament.categories.slice(0, 3).map((cat, index) => (
              <span key={index} className="px-2 py-0.5 text-xs bg-gp-pastel/20 text-gp-dark rounded">
                {cat.category}-{cat.gender}
              </span>
            ))}
            {tournament.categories.length > 3 && (
              <span className="px-2 py-0.5 text-xs bg-gp-gray-light text-gp-gray rounded">
                +{tournament.categories.length - 3}
              </span>
            )}
          </div>
        )}

        {isAdmin && (
          <div className="flex items-center gap-2 pt-3 border-t border-gp-gray-light" onClick={(e) => e.stopPropagation()}>
            {canStart && onStart && (
              <button
                onClick={handleStart}
                className="px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Iniciar
              </button>
            )}
            {canDelete && onDelete && (
              <button
                onClick={handleDelete}
                className="px-3 py-1.5 text-sm bg-gp-red text-white rounded hover:bg-gp-red/80 transition-colors"
              >
                Eliminar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
