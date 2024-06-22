import { TournamentDTO } from "../entities/dtos/TournamentDTO";

export default function useGetCategories(tournaments: TournamentDTO[]) {
  const allCategories = tournaments.flatMap((t) => t.Categories);

  return Array.from(new Set(allCategories.map((c) => JSON.stringify(c)))).map(
    (str) => JSON.parse(str)
  );
}
