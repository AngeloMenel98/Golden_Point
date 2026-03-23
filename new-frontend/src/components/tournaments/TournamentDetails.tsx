'use client';

import { useEffect, useState } from 'react';
import { getStatusLabel, TournamentStatus } from '@/entities/Tournament';
import { useTournament } from '@/context/TournamentContext';

interface TournamentDetailsProps {
  tournamentId: string;
  isAdmin?: boolean;
}

export function TournamentDetails({ tournamentId }: TournamentDetailsProps) {
  const { currentTournament, setCurrentTournament } = useTournament();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTournament = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/tournaments/${tournamentId}`, {
          credentials: 'include',
        });
        const result = await response.json();
        
        if (result.success && result.data) {
          setCurrentTournament(result.data);
        }
      } catch (err) {
        console.error('Error loading tournament details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (tournamentId) {
      loadTournament();
    }
  }, [tournamentId, setCurrentTournament]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gp-dark"></div>
      </div>
    );
  }

  if (!currentTournament) {
    return (
      <div className="text-center p-8">
        <p className="text-gp-gray">Torneo no encontrado</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gp-gray-light p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gp-dark">{currentTournament.name}</h1>
          <p className="text-sm text-gp-gray mt-1">
            Tour ID: {currentTournament.tourId}
          </p>
        </div>
        <span className={`px-3 py-1.5 text-sm font-medium rounded-full border ${getStatusBadgeClass(currentTournament.status as TournamentStatus)}`}>
          {getStatusLabel(currentTournament.status)}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gp-light/50 rounded-lg p-4">
          <p className="text-sm text-gp-gray">Master Score</p>
          <p className="text-xl font-bold text-gp-dark">{currentTournament.masterScore}</p>
        </div>
        <div className="bg-gp-light/50 rounded-lg p-4">
          <p className="text-sm text-gp-gray">Categorías</p>
          <p className="text-xl font-bold text-gp-dark">{currentTournament.categories?.length || 0}</p>
        </div>
        <div className="bg-gp-light/50 rounded-lg p-4">
          <p className="text-sm text-gp-gray">Equipos</p>
          <p className="text-xl font-bold text-gp-dark">{currentTournament.teams?.length || 0}</p>
        </div>
        <div className="bg-gp-light/50 rounded-lg p-4">
          <p className="text-sm text-gp-gray">Creado</p>
          <p className="text-sm font-medium text-gp-dark">
            {currentTournament.createdAt ? new Date(currentTournament.createdAt).toLocaleDateString('es-AR') : '-'}
          </p>
        </div>
      </div>

      {currentTournament.categories && currentTournament.categories.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gp-dark mb-3">Categorías</h2>
          <div className="flex flex-wrap gap-2">
            {currentTournament.categories.map((cat, index) => (
              <span key={index} className="px-3 py-1.5 bg-gp-pastel/30 text-gp-dark rounded-full text-sm">
                {cat.category}-{cat.gender}
              </span>
            ))}
          </div>
        </div>
      )}

      {currentTournament.teams && currentTournament.teams.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gp-dark mb-3">Equipos Participantes</h2>
          <div className="space-y-2">
            {currentTournament.teams.map((team: { id: string; name: string }, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gp-light/30 rounded-lg">
                <span className="font-medium text-gp-dark">{team.name}</span>
                <span className="text-sm text-gp-gray">#{team.id}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
