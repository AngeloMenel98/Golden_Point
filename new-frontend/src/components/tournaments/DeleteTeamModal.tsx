'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useTournament } from '@/context/TournamentContext';

interface DeleteTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
  teamName: string;
  tournamentId: string;
}

export function DeleteTeamModal({ isOpen, onClose, teamId, teamName, tournamentId }: DeleteTeamModalProps) {
  const { removeTeam } = useTournament();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await removeTeam(teamId, tournamentId);

      if (result.success) {
        onClose();
      } else {
        setError(result.error || 'Error al eliminar el equipo');
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gp-dark">Eliminar Equipo</h2>
          <button
            onClick={onClose}
            className="text-gp-gray hover:text-gp-dark transition-colors"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gp-gray mb-4">
            ¿Estás seguro de que deseas eliminar el equipo?
          </p>
          <div className="bg-gp-light/50 rounded-lg p-4">
            <p className="font-medium text-gp-dark text-lg">{teamName}</p>
          </div>
          <p className="text-gp-red text-sm mt-3">
            Esta acción no se puede deshacer.
          </p>
        </div>

        {error && (
          <p className="text-gp-red text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="flex-1 bg-gp-red hover:bg-red-600"
          >
            Eliminar
          </Button>
        </form>
      </div>
    </div>
  );
}
