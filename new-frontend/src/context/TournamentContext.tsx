'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Tournament, TournamentStatus } from '@/entities/Tournament';

interface TournamentContextType {
  tournaments: Tournament[];
  setTournaments: React.Dispatch<React.SetStateAction<Tournament[]>>;
  currentTournament: Tournament | null;
  setCurrentTournament: (tournament: Tournament | null) => void;
  teams: { id: string; name: string }[];
  setTeams: React.Dispatch<React.SetStateAction<{ id: string; name: string }[]>>;
  isLoading: boolean;
  error: string | null;
  fetchTournaments: (tourId?: string) => Promise<void>;
  createTournament: (data: { name: string; tourId: string; masterScore: number; categories: string[] }) => Promise<{ success: boolean; error?: string }>;
  deleteTournament: (id: string) => Promise<{ success: boolean; error?: string }>;
  startTournament: (id: string) => Promise<{ success: boolean; error?: string }>;
  refreshTournaments: () => Promise<void>;
  fetchTeams: (tournamentId: string) => Promise<void>;
  addTeam: (data: { tournamentId: string; teamName: string; category: string; playerIds: string[] }) => Promise<{ success: boolean; error?: string }>;
  removeTeam: (teamId: string, tournamentId: string) => Promise<{ success: boolean; error?: string }>;
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

export function TournamentProvider({ children, initialTournaments = [] }: { children: ReactNode; initialTournaments?: Tournament[] }) {
  const [tournaments, setTournaments] = useState<Tournament[]>(initialTournaments);
  const [currentTournament, setCurrentTournament] = useState<Tournament | null>(null);
  const [teams, setTeams] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshTournaments = useCallback(async (tourId?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const url = tourId ? `/api/tournaments?tourId=${tourId}` : '/api/tournaments';
      const response = await fetch(url, {
        credentials: 'include',
      });
      
      const result = await response.json();
      
      if (!result.success) {
        setError(result.error || 'Error al cargar los torneos');
        return;
      }
      
      setTournaments(result.data || []);
    } catch (err) {
      console.error('Error fetching tournaments:', err);
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTournaments = useCallback(async (tourId?: string) => {
    await refreshTournaments(tourId);
  }, [refreshTournaments]);

  const createTournament = useCallback(async (data: { name: string; tourId: string; masterScore: number; categories: string[] }): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/tournaments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        return { success: false, error: result.error };
      }
      
      // Refresh tournaments list after creation
      await refreshTournaments(data.tourId);
      return { success: true };
    } catch (err) {
      console.error('Error creating tournament:', err);
      return { success: false, error: 'Error de conexión. Intenta de nuevo.' };
    } finally {
      setIsLoading(false);
    }
  }, [refreshTournaments]);

  const deleteTournament = useCallback(async (id: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/tournaments/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      const result = await response.json();
      
      if (!result.success) {
        return { success: false, error: result.error };
      }
      
      // Refresh tournaments list after deletion
      await refreshTournaments();
      
      // Clear current tournament if it was deleted
      if (currentTournament?.id === id) {
        setCurrentTournament(null);
      }
      
      return { success: true };
    } catch (err) {
      console.error('Error deleting tournament:', err);
      return { success: false, error: 'Error de conexión. Intenta de nuevo.' };
    } finally {
      setIsLoading(false);
    }
  }, [refreshTournaments, currentTournament]);

  const startTournament = useCallback(async (id: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/tournaments/${id}/start`, {
        method: 'POST',
        credentials: 'include',
      });
      
      const result = await response.json();
      
      if (!result.success) {
        return { success: false, error: result.error };
      }
      
      // Refresh tournaments list after starting
      await refreshTournaments();
      
      // Update current tournament if it's the one we started
      if (currentTournament?.id === id) {
        setCurrentTournament({
          ...currentTournament,
          status: TournamentStatus.IN_PROGRESS
        });
      }
      
      return { success: true };
    } catch (err) {
      console.error('Error starting tournament:', err);
      return { success: false, error: 'Error de conexión. Intenta de nuevo.' };
    } finally {
      setIsLoading(false);
    }
  }, [refreshTournaments, currentTournament]);

  const fetchTeams = useCallback(async (tournamentId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/teams?tournamentId=${tournamentId}`, {
        credentials: 'include',
      });
      
      const result = await response.json();
      
      if (!result.success) {
        setError(result.error || 'Error al cargar los equipos');
        return;
      }
      
      const teamsData = result.data || [];
      setTeams(teamsData);
      
      // Also update currentTournament.teams if it matches
      if (currentTournament?.id === tournamentId) {
        setCurrentTournament({
          ...currentTournament,
          teams: teamsData,
        });
      }
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, [currentTournament, setCurrentTournament]);

  const addTeam = useCallback(async (data: { tournamentId: string; teamName: string; category: string; playerIds: string[] }): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        return { success: false, error: result.error };
      }
      
      // Refresh teams list after creation
      await fetchTeams(data.tournamentId);
      return { success: true };
    } catch (err) {
      console.error('Error adding team:', err);
      return { success: false, error: 'Error de conexión. Intenta de nuevo.' };
    } finally {
      setIsLoading(false);
    }
  }, [fetchTeams]);

  const removeTeam = useCallback(async (teamId: string, tournamentId: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/teams/${teamId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      const result = await response.json();
      
      if (!result.success) {
        return { success: false, error: result.error };
      }
      
      // Refresh teams list after deletion
      await fetchTeams(tournamentId);
      
      return { success: true };
    } catch (err) {
      console.error('Error removing team:', err);
      return { success: false, error: 'Error de conexión. Intenta de nuevo.' };
    } finally {
      setIsLoading(false);
    }
  }, [fetchTeams]);

  return (
    <TournamentContext.Provider
      value={{
        tournaments,
        setTournaments,
        currentTournament,
        setCurrentTournament,
        teams,
        setTeams,
        isLoading,
        error,
        fetchTournaments,
        createTournament,
        deleteTournament,
        startTournament,
        refreshTournaments,
        fetchTeams,
        addTeam,
        removeTeam,
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
}

export function useTournament(): TournamentContextType {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error('useTournament must be used within a TournamentProvider');
  }
  return context;
}
