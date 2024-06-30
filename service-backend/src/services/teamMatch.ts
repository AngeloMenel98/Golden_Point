import { TeamMatchRepository } from "../repository";

export class TeamMatchService {
  async addWinner(teamsId: string[], winner: string, matchId: string) {
    const teamId = winner === "Team 1" ? teamsId[0] : teamsId[1];

    await TeamMatchRepository.update({ teamId, matchId }, { isWinner: true });
  }
}
