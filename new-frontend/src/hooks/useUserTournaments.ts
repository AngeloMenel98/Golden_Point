import { useState, useCallback } from 'react';

export interface UserTournament {
  id: string;
  name: string;
  status: string;
  category?: string;
  matchDate?: string;
  teamName?: string;
}

interface UseUserTournamentsReturn {
  tournaments: UserTournament[];
  isLoading: boolean;
  error: string | null;
  fetchUserTournaments: (userId: string) => Promise<void>;
}

export function useUserTournaments(): UseUserTournamentsReturn {
  const [tournaments, setTournaments] = useState<UserTournament[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserTournaments = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/tournaments/user/${userId}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user tournaments');
      }

      const data = await response.json();
      setTournaments(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching tournaments');
      setTournaments([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    tournaments,
    isLoading,
    error,
    fetchUserTournaments,
  };
}