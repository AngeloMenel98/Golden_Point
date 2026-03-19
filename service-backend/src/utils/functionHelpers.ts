import { CourtData, TeamData } from "./interfaces";
import { conflict } from "../types/error/app-error";

function sortTeamsPerCategoryByPoints(teamData: TeamData[]) {
  if (teamData.length === 0) {
    throw conflict("No se encontro ningún Equipo para ordenar por puntos", "Equipo");
  }

  const teamsByCategory = {};

  teamData.forEach((team) => {
    const { category } = team;

    // Si la categoría no está en el objeto, agrégala y crea un array para almacenar los equipos
    if (!teamsByCategory[category]) {
      teamsByCategory[category] = [];
    }
    teamsByCategory[category].push(team);
  });

  // Ordena los equipos dentro de cada categoría por totalPoints de mayor a menor
  for (const category in teamsByCategory) {
    teamsByCategory[category].sort((a, b) => b.totalPoints - a.totalPoints);
  }

  return teamsByCategory;
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export { sortTeamsPerCategoryByPoints, shuffleArray };
