'use client';

import { useEffect, useState } from 'react';
import { useTournament } from '@/context/TournamentContext';
import { Button } from '@/components/ui/Button';

interface TeamsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournamentId: string;
}

export function TeamsListModal({ isOpen, onClose, tournamentId }: TeamsListModalProps) {
  const { teams, fetchTeams, removeTeam } = useTournament();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && tournamentId) {
      fetchTeams(tournamentId);
    }
  }, [isOpen, tournamentId, fetchTeams]);

  const handleDelete = async (teamId: string) => {
    setIsDeleting(teamId);
    try {
      await removeTeam(teamId, tournamentId);
      await fetchTeams(tournamentId);
    } finally {
      setIsDeleting(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gp-gray-light">
          <h2 className="text-xl font-bold text-gp-dark">Equipos del Torneo</h2>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {teams.length === 0 ? (
            <p className="text-gp-gray text-center py-8">No hay equipos registrados</p>
          ) : (
            <div className="space-y-2">
              {teams.map((team: { id: string; name: string }) => (
                <div key={team.id} className="flex items-center justify-between p-3 bg-gp-light/30 rounded-lg">
                  <span className="font-medium text-gp-dark">{team.name}</span>
                  <button
                    onClick={() => handleDelete(team.id)}
                    disabled={isDeleting === team.id}
                    className="p-2 text-gp-gray hover:text-gp-red hover:bg-gp-red/10 rounded transition-colors disabled:opacity-50"
                    title="Eliminar equipo"
                  >
                    {isDeleting === team.id ? (
                      <div className="animate-spin h-4 w-4 border-2 border-gp-red border-t-transparent rounded-full"></div>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gp-gray-light">
          <Button onClick={onClose} variant="secondary" className="w-full">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
