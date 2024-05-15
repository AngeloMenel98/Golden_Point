import { useEffect, useState } from "react";
import { Category, TournamentDTO } from "../entities/dtos/TournamentDTO";
import TournamentAPI from "../services/TournamentApi";
import { TourDTO } from "../entities/dtos/TourDTO";

const tournAPI = new TournamentAPI();

interface TournamentResponse {
  [tournamentId: string]: {
    tournamentName: string;
    teamsCount: string;
    master: number;
    categories: Category[];
  };
}

export default function useGetTournaments(tour: TourDTO | null) {
  const [tournaments, setTournaments] = useState<TournamentDTO[]>([]);

  if (!tour) {
    return {
      tournaments,
      tournAPI,
    };
  }

  const getTournaments = async () => {
    const tournArray: TournamentDTO[] = [];

    const tournRes: TournamentResponse = await tournAPI.getTournaments(tour.Id);

    for (const [tournamentId, tournamentData] of Object.entries(tournRes)) {
      const newTourn = new TournamentDTO();

      newTourn.Id = tournamentId;
      newTourn.Title = tournamentData.tournamentName;
      newTourn.TeamsCount = parseInt(tournamentData.teamsCount, 10);
      newTourn.Master = tournamentData.master;
      newTourn.Categories = tournamentData.categories;

      tournArray.push(newTourn);
    }

    setTournaments(tournArray);
  };

  useEffect(() => {
    getTournaments();
  }, []);

  return { tournaments, tournAPI };
}
