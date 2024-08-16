import { useEffect, useState } from "react";
import TournamentAPI from "../services/TournamentApi";

const tournAPI = new TournamentAPI();

export default function useGetCatsByTournId(tournamentId: string | null) {
  const [categories, setCategories] = useState<string[]>([]);

  if (tournamentId == null) {
    return categories;
  }

  const getCats = async () => {
    const catsArray: string[] = [];
    const catsRes: any = await tournAPI.getCatsByTournId(tournamentId);

    catsRes.forEach((c: any) => {
      catsArray.push(c);
    });

    setCategories(catsArray);
  };

  useEffect(() => {
    getCats();
  }, [tournamentId]);

  return categories;
}
