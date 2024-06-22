import { useEffect, useState } from "react";
import TeamAPI from "../services/TeamApi";
import { TeamDTO } from "../entities/dtos/TeamDTO";

const teamApi = new TeamAPI();

export default function useGetTeams(tournamentId: string) {
  const [allTeams, setAllTeams] = useState<TeamDTO[]>([]);

  const getTeams = async () => {
    const teamArray: TeamDTO[] = [];
    const teamRes = await teamApi.getTeams(tournamentId);

    teamRes.forEach((t: any) => {
      const team = new TeamDTO();

      console.log(t);
      team.TeamId = t.teamId;
      team.TourId = t.tourId;
      team.UsersId = t.usersId;
      team.TeamName = t.teamName;
      team.Category = t.category;

      teamArray.push(team);
    });

    setAllTeams(teamArray);
  };

  useEffect(() => {
    getTeams();
  }, [tournamentId]);

  return { allTeams, teamApi };
}
