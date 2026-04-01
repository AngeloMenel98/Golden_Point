import { useState, useCallback } from "react";

interface UserGlobalStats {
  wins: number;
  losses: number;
  winRate: number;
  gamesWon: number;
  gamesLost: number;
  totalPoints: number;
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

  const fetchUserStats = useCallback(
    async (userId: string, tournamentId?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        // If tournamentId is provided, fetch only tournament-specific stats
        // Otherwise, fetch global stats
        let stats: UserStatsData;

        if (tournamentId) {
          // Call tournament-specific endpoint only (no separate global call)
          const tourStatsResponse = await fetch(
            `/api/users/stats/${tournamentId}/${userId}`,
            {
              credentials: "include",
            },
          );

          if (!tourStatsResponse.ok) {
            throw new Error("Failed to fetch user tournament stats");
          }

          const tourStatsData = await tourStatsResponse.json();

          // For tournament-specific view, structure the stats appropriately
          // The tournament stats become the "global" in this context for display
          stats = {
            global: tourStatsData.data || tourStatsData,
          };
        } else {
          const globalResponse = await fetch(`/api/users/stats/${userId}`, {
            credentials: "include",
          });

          if (!globalResponse.ok) {
            throw new Error("Failed to fetch user global stats");
          }

          const globalData = await globalResponse.json();
          stats = {
            global: globalData.data || globalData,
          };
        }

        setUserStats(stats);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching stats");
        setUserStats(null);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const fetchRankings = useCallback(async (tourId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/users/rankings/${tourId}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch rankings");
      }

      const data = await response.json();
      setRankings(data.data || data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching rankings");
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
