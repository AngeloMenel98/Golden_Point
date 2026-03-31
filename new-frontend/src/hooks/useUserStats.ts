import { useState, useCallback } from 'react';

interface UserGlobalStats {
  matchesWon: number;
  matchesLost: number;
  setsWon: number;
  setsLost: number;
  points: number;
  tournamentsPlayed: number;
  currentRanking: number;
  highestRanking: number;
}

interface UserTournamentStats {
  matchesWon: number;
  matchesLost: number;
  setsWon: number;
  setsLost: number;
  points: number;
  position: number;
}

interface UserRanking {
  userId: string;
  username: string;
  fullName?: string;
  points: number;
  ranking: number;
}

interface UserStatsData {
  global: UserGlobalStats;
  tournament?: UserTournamentStats;
}

interface UseUserStatsReturn {
  userStats: UserStatsData | null;
  rankings: UserRanking[];
  isLoading: boolean;
  error: string | null;
  fetchUserStats: (userId: string, tournamentId?: string) => Promise<void>;
  fetchRankings: (tourId: string) => Promise<void>;
}

export function useUserStats(): UseUserStatsReturn {
  const [userStats, setUserStats] = useState<UserStatsData | null>(null);
  const [rankings, setRankings] = useState<UserRanking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserStats = useCallback(async (userId: string, tournamentId?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch global stats
      const globalResponse = await fetch(`/api/users/stats/${userId}`, {
        credentials: 'include',
      });

      if (!globalResponse.ok) {
        throw new Error('Failed to fetch user stats');
      }

      const globalData = await globalResponse.json();

      let stats: UserStatsData = {
        global: globalData.data || globalData,
      };

      // If tournamentId provided, fetch tournament-specific stats
      if (tournamentId) {
        const tourStatsResponse = await fetch(
          `/api/users/stats/${tournamentId}/${userId}`,
          {
            credentials: 'include',
          }
        );

        if (tourStatsResponse.ok) {
          const tourStatsData = await tourStatsResponse.json();
          stats.tournament = tourStatsData.data || tourStatsData;
        }
      }

      setUserStats(stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching stats');
      setUserStats(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchRankings = useCallback(async (tourId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/users/rankings/${tourId}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch rankings');
      }

      const data = await response.json();
      setRankings(data.data || data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching rankings');
      setRankings([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    userStats,
    rankings,
    isLoading,
    error,
    fetchUserStats,
    fetchRankings,
  };
}