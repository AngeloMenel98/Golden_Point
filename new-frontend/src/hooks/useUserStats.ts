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
  category: string;
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

interface GlobalRankingResponse {
  userId: string;
  userName: string;
  position: number;
  points: number;
  category: string;
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
        let stats: UserGlobalStats;

        if (tournamentId) {
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

          // For tournament-specific view, use tournament stats
          const tourStats = tourStatsData.data || tourStatsData;
          stats = {
            wins: tourStats.wins,
            losses: tourStats.losses,
            winRate: tourStats.winRate,
            gamesWon: tourStats.gamesWon,
            gamesLost: tourStats.gamesLost,
            totalPoints: tourStats.totalPoints,
            tournamentsPlayed: 0,
            currentRanking: 0,
            category: tourStats.category,
            highestRanking: 0,
          };
        } else {
          // Fetch global stats
          const globalResponse = await fetch(`/api/users/stats/${userId}`, {
            credentials: "include",
          });

          if (!globalResponse.ok) {
            throw new Error("Failed to fetch user global stats");
          }

          const globalData = await globalResponse.json();
          const globalStats = globalData.data || globalData;

          // Fetch global rankings to calculate user's position
          let currentRanking = 0;
          let highestRanking = 0;
          let catName = "";

          try {
            const rankingsResponse = await fetch(`/api/users/rankings`, {
              credentials: "include",
            });

            if (rankingsResponse.ok) {
              const rankingsData = await rankingsResponse.json();

              const rankings: GlobalRankingResponse[] =
                rankingsData.data || rankingsData;

              const userIndex = rankings.findIndex((r) => r.userId === userId);
              if (userIndex !== -1) {
                currentRanking = rankings[userIndex].position;
                highestRanking = currentRanking;
                catName = rankings[userIndex].category;
              }
            }
          } catch (rankingError) {
            // If rankings fetch fails, show N/A (ranking remains 0)
            console.error("Failed to fetch rankings:", rankingError);
          }

          stats = {
            wins: globalStats.wins,
            losses: globalStats.losses,
            winRate: globalStats.winRate,
            gamesWon: globalStats.gamesWon,
            gamesLost: globalStats.gamesLost,
            totalPoints: globalStats.totalPoints,
            tournamentsPlayed: 0,
            currentRanking,
            category: catName,
            highestRanking,
          };
        }

        setUserStats({ global: stats });
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
