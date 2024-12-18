import { useEffect, useState, useCallback } from "react";
import { Category, TournamentDTO } from "../entities/dtos/TournamentDTO";
import TournamentAPI from "../services/TournamentApi";
import { Errors } from "../errors/Errors";
import { TourData } from "../utils/interfaces";

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
      const tournRes = await tournAPI.getTournaments(tour.id);
      let tournData: TournamentResponse = {};

      if (!tournRes.fieldErrors?.notFound) {
        tournData = tournRes;

        for (const [tournamentId, tournamentData] of Object.entries(
          tournData
        )) {
          const newTourn = new TournamentDTO();

          newTourn.Id = tournamentId;
          newTourn.Title = tournamentData.tournamentName;
          newTourn.TeamsCount = parseInt(tournamentData.teamsCount, 10);
          newTourn.Master = tournamentData.master;
          newTourn.Categories = tournamentData.categories;
          newTourn.Status = tournamentData.status;

          tournArray.push(newTourn);
        }

        setTournaments(tournArray);
      } else {
        setErrors(tournRes.fieldErrors);
      }

      setIsLoading(false);
      setHasFetched(true);
    } catch (error) {
      setErrors({
        general: "An unexpected error occurred while fetching tournaments.",
      });
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
