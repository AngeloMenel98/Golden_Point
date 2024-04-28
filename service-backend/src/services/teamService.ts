import { TeamRepository, UserRepository } from "../repository";
import { Team, Tournament } from "../entity";
import { ServiceCodeError } from "../errors/errorsClass";
import codeErrors from "../constants/codeErrors";
import { Manager } from "../helpers/manager";

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
      throw new ServiceCodeError(codeErrors.TEAM_1);
    }

    let teamName = "";
    const namesAndInitials = users.map((user) => {
      const firstName = user.perData.firstName.charAt(0);
      const lastName = user.perData.lastName;
      return `${lastName} ${firstName}.`;
    });
    teamName = namesAndInitials.join("-");

    return await TeamRepository.save({
      ...newTeam,
      teamName: teamName,
      users: users.map((user) => user.user),
      tournament,
    });
  }

  async getTeamWithUsers(teamId: string) {
    const team = await TeamRepository.findOneBy({ id: teamId });

    if (!team) {
      throw new ServiceCodeError(codeErrors.GEN_1("Team"));
    }

    const userByTeam = await UserRepository.getUsersByTeamId(teamId);

    return { team, users: userByTeam };
  }

  async findById(teamId: string) {
    const existingTeam = await TeamRepository.findOneBy({
      id: teamId,
    });

    if (!existingTeam) {
      throw new ServiceCodeError(codeErrors.GEN_1("Team"));
    }

    return existingTeam;
  }
}
