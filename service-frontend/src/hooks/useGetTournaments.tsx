import { useEffect, useState } from "react";
import { TournamentDTO } from "../entities/dtos/TournamentDTO";
import TournamentAPI from "../services/TournamentApi";
import { TourDTO } from "../entities/dtos/TourDTO";

const tournAPI = new TournamentAPI();

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

    const tournRes = await tournAPI.getTournaments(tour.Id);

    tournRes.forEach((t: any) => {
      const newTourn = new TournamentDTO();

      newTourn.Id = t.tournamentid;
      newTourn.Title = t.tournamentname;
      newTourn.TeamsCount = t.teamscount;
      newTourn.Master = t.master;

      tournArray.push(newTourn);
    });

    setTournaments(tournArray);
  };

  useEffect(() => {
    getTournaments();
  }, []);

  return { tournaments, tournAPI };
}
