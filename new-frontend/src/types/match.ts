export interface MatchPlayer {
  firstName: string;
  lastName: string;
}

export interface MatchTeam {
  teamId: string;
  teamName: string;
  players: MatchPlayer[];
  isWinner: boolean;
  position: number;
}

export interface MatchSet {
  setNumber: number;
  gamesTeam1: number;
  gamesTeam2: number;
}

export interface Match {
  id: string;
  matchDate: string;
  groupStage: string;
  teamsName: string;
  category: string;
  courtNumber: number;
  clubId: string;
  clubName: string;
  games: string;
  amountTourPoints: number;
  amountTourCoins: number;
  teams: MatchTeam[];
  sets?: MatchSet[];
}

/**
 * "Gerrr S.-Gg I., Silva I.-Espindola L."
 *  → team1: ["Gerrr S.", "Gg I."]
 *    team2: ["Silva I.", "Espindola L."]
 */
export function parseTeams(teamsname: string): [string[], string[]] {
  const [t1raw, t2raw] = teamsname.split(", ");
  return [t1raw.split("-"), t2raw.split("-")];
}

/**
 * "6-2, 6-2"  → [{ t1: 6, t2: 2 }, { t1: 6, t2: 2 }]
 * ""           → []
 */
export function parseSets(games: string): { t1: number; t2: number }[] {
  if (!games) return [];
  return games.split(", ").map((s) => {
    const [a, b] = s.split("-").map(Number);
    return { t1: a, t2: b };
  });
}

export function formatMatchDate(iso: string): string {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
}
