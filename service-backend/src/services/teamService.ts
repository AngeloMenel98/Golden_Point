import { TeamRepository, UserRepository } from "../repository";
import { Team, Tournament } from "../entity";
import { Manager } from "../helpers/manager";
import { notFound, conflict, validationError } from "../types/error/app-error";

export class TeamService {
  constructor() {}

  async create(
    newTeam: Team,
    usersId: string[],
    manager: Manager,
    tournament: Tournament
  ) {
    const users = await Promise.all(
      usersId.map((userId) => manager.checkUserWithData(userId))
    );

    if (users.length > 2) {
      throw validationError("La cantidad de jugadores por equipo son 2");
    }

    let teamName = "";
    const namesAndInitials = users.map((user) => {
      const firstName = user.perData.firstName.charAt(0);
      const lastName = user.perData.lastName;
      return `${lastName} ${firstName}.`;
    });
    teamName = namesAndInitials.join("-");

    return TeamRepository.save({
      ...newTeam,
      teamName: teamName,
      users: users.map((user) => user.user),
      tournament,
    });
  }

  async getTeamWithUsers(teamId: string) {
    const team = await TeamRepository.findOneBy({ id: teamId });

    if (!team) {
      throw notFound("Team", teamId);
    }

    const usersByTeam = await UserRepository.getUsersByTeamId(teamId);

    return { team, users: usersByTeam };
  }

  async findById(teamId: string) {
    const existingTeam = await TeamRepository.findOneBy({
      id: teamId,
    });

    if (!existingTeam) {
      throw notFound("Team", teamId);
    }

    return existingTeam;
  }

  async getTeams(tournamentId: string) {
    const teams = await TeamRepository.getTeams(tournamentId);

    if (!teams) {
      throw notFound("Teams", tournamentId);
    }

    return teams;
  }

  async delete(teamsId: string[]) {
    return TeamRepository.delete(teamsId);
  }
}
