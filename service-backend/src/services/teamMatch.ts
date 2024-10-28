import { TeamMatchRepository } from "../repository";

export class TeamMatchService {
  async addWinner(teamId: string, matchId: string) {
    await TeamMatchRepository.update({ teamId, matchId }, { isWinner: true });
  }
}
