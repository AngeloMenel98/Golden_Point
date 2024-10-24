import { useEffect, useState, useCallback } from "react";
import { Category, TournamentDTO } from "../entities/dtos/TournamentDTO";
import TournamentAPI from "../services/TournamentApi";
import { TourDTO } from "../entities/dtos/TourDTO";
import { Errors } from "../errors/Errors";

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

export default function useGetTournaments(tour: TourDTO | null) {
  const [tournaments, setTournaments] = useState<TournamentDTO[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const getTournaments = useCallback(async () => {
    if (!tour) return;

    setIsLoading(true);
    setErrors({});

    try {
      const tournArray: TournamentDTO[] = [];
      const tournRes = await tournAPI.getTournaments(tour.Id);
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

        if (tournArray.length === 0) {
          setErrors({ general: "No tournaments found for the selected tour." });
        }
      } else {
        setErrors(tournRes.fieldErrors);
      }

      setIsLoading(false);
      setHasFetched(true);
    } catch (error) {
      setErrors({
        general: "An unexpected error occurred while fetching tournaments.",
      });
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
    refetch: getTournaments,
    hasFetched,
  };
}
