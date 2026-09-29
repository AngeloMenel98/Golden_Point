import { useEffect, useState, useCallback } from "react";
import { Category, TournamentDTO } from "../entities/dtos/TournamentDTO";
import TournamentAPI from "../services/TournamentApi";
import { Errors } from "../errors/Errors";
import { TourData } from "../utils/interfaces";
import { ApiError } from "../services/GeneralApi";

const tournAPI = new TournamentAPI();

interface TournamentResponse {
  [tournamentId: string]: {
    tournamentName: string;
    teamsCount: string;
    master: number;
    categories: Category[];
    status: string;
  };
}

export default function useGetTournaments(tour: TourData | null) {
  const [tournaments, setTournaments] = useState<TournamentDTO[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const getTournaments = useCallback(async () => {
    if (!tour) return;

    setIsLoading(true);
    setHasFetched(false);
    setErrors({});

    try {
      const tournArray: TournamentDTO[] = [];
      const tournData: TournamentResponse = await tournAPI.getTournaments(tour.id);

      for (const [tournamentId, tournamentInfo] of Object.entries(
        tournData
      )) {
        const newTourn = new TournamentDTO();

        newTourn.Id = tournamentId;
        newTourn.Title = tournamentInfo.tournamentName;
        newTourn.TeamsCount = parseInt(tournamentInfo.teamsCount, 10);
        newTourn.Master = tournamentInfo.master;
        newTourn.Categories = tournamentInfo.categories;
        newTourn.Status = tournamentInfo.status;

        tournArray.push(newTourn);
      }

      setTournaments(tournArray);
      setHasFetched(true);
    } catch (err) {
      if (err instanceof ApiError && err.payload.fieldErrors) {
        setErrors(err.payload.fieldErrors);
      } else {
        setErrors({
          general: "An unexpected error occurred while fetching tournaments.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [tour]);

  useEffect(() => {
    getTournaments();
  }, [getTournaments]);

  return {
    tournaments,
    errors,
    isLoading,
    hasFetched,
    refetch: getTournaments,
  };
}
