import { Category } from "../entities/dtos/TournamentDTO";

export default function useSeparateCats(categories: Category[][]) {
  const maleCat: string[] = [];
  const femaleCat: string[] = [];

  categories.forEach((c) =>
    c.forEach((c) => {
      c.gender === "Masculino"
        ? maleCat.push(c.category)
        : femaleCat.push(c.category);
    })
  );

  return { maleCat, femaleCat };
}
