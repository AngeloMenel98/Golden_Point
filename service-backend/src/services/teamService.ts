import { TeamRepository, UserRepository } from "../repository";
import { Team, Tournament } from "../entity";
import { ServiceCodeError } from "../errors/errorsClass";
import codeErrors from "../constants/codeErrors";

export class TeamService {
  constructor() {}

  async create(newTeam: Team, users: any[], tournament: Tournament) {
    let teamName = "";
    const lastNames = users.map((user) => user.perData.lastName);
    teamName = lastNames.join("-");

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
