export function formatGames(games: string): number[] {
  if (!games) {
    return [];
  }
  const gamePairs = games.split(",").map((game) => game.trim());
  const result: number[] = [];

  // Iteramos sobre cada par de juegos
  for (let i = 0; i < gamePairs.length; i++) {
    const [team1Score, team2Score] = gamePairs[i].split("-").map(Number);
    result.push(team1Score, team2Score);
  }

  // Si solo hay un par de juegos, repetimos los datos para el segundo set y el tercer set es 0-0
  if (gamePairs.length === 1) {
    result.push(...result.slice(0, 2), 0, 0);
  }
  // Si hay dos pares de juegos, el tercer set es 0-0
  else if (gamePairs.length === 2) {
    result.push(0, 0);
  }

  return result;
}
