import { useEffect, useState } from "react";
import TeamAPI from "../services/TeamApi";
import { TeamDTO } from "../entities/dtos/TeamDTO";

const teamApi = new TeamAPI();

export default function useGetTeams(tournamentId: string | null) {
  const [allTeams, setAllTeams] = useState<TeamDTO[]>([]);

  if (tournamentId == null) {
    return { allTeams, teamApi };
  }

  const getTeams = async () => {
    const teamArray: TeamDTO[] = [];
    const teamRes: any = await teamApi.getTeams(tournamentId);

    teamRes.forEach((t: any) => {
      const team = new TeamDTO();

      team.TeamId = t.teamId;
      team.UsersId = t.usersId;
      team.TeamName = t.teamName;
      team.Category = t.category;
      team.TournamentName = t.tournamentTitle;

      teamArray.push(team);
    });

    setAllTeams(teamArray);
  };

  useEffect(() => {
    getTeams();
  }, [tournamentId]);

  return { allTeams, teamApi };
}
