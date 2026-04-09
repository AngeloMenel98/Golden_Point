import { QualifiedTeam } from "../types/dto/tournament.dto";

export const quarterFinalKnockOut = (
  teamsByGroup: Record<string, QualifiedTeam[]>,
  groups: string[],
) => {
  const matchups: [QualifiedTeam, QualifiedTeam][] = [];
  if (teamsByGroup[groups[0]] && teamsByGroup[groups[3]]) {
    matchups.push([
      teamsByGroup[groups[0]][0], // A1
      teamsByGroup[groups[3]][1], // D2
    ]);
    matchups.push([
      teamsByGroup[groups[3]][0], // D1
      teamsByGroup[groups[0]][1], // A2
    ]);
  }

  if (teamsByGroup[groups[1]] && teamsByGroup[groups[2]]) {
    matchups.push([
      teamsByGroup[groups[1]][0], // B1
      teamsByGroup[groups[2]][1], // C2
    ]);
    matchups.push([
      teamsByGroup[groups[2]][0], // C1
      teamsByGroup[groups[1]][1], // B2
    ]);
  }
  console.log("matchups", matchups);

  return matchups;
};

export const semiFinalKnockOut = (teams: QualifiedTeam[]) => {
  const matchups: [QualifiedTeam, QualifiedTeam][] = [];
  const sortedTeams = [...teams].sort(
    (a, b) => (a.matchOrder || 0) - (b.matchOrder || 0),
  );
  if (sortedTeams.length === 4) {
    matchups.push([sortedTeams[0], sortedTeams[1]]);
    matchups.push([sortedTeams[2], sortedTeams[3]]);
  }
  return matchups;
};
