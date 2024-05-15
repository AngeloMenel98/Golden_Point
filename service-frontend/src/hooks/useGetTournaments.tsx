import { useEffect, useState } from "react";
import { Category, TournamentDTO } from "../entities/dtos/TournamentDTO";
import TournamentAPI from "../services/TournamentApi";
import { TourDTO } from "../entities/dtos/TourDTO";

const tournAPI = new TournamentAPI();

interface TournamentResponse {
  [tournamentName: string]: {
    tournamentId: string;
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

    // Iterar sobre las propiedades del objeto de respuesta
    for (const [tournamentName, tournamentData] of Object.entries(tournRes)) {
      const newTourn = new TournamentDTO();

      newTourn.Id = tournamentData.tournamentId;
      newTourn.Title = tournamentName;
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
