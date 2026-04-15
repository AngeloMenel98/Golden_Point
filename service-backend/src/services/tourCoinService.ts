import { TeamMatchRepository } from "../repository/teamMatch.repository";
import { TourCoinRepository } from "../repository/tourCoin.repository";

export class TourCoinService {
  async creditWinnerTeam(
    matchId: string,
    winner: number,
    amountTourCoins: number,
  ): Promise<{ credited: number; created: number }> {
    // Early return if amount is 0 or null
    if (!amountTourCoins) {
      return { credited: 0, created: 0 };
    }

    // Find the winning team match
    const teamMatch = await TeamMatchRepository.findByMatchAndPosition(
      matchId,
      winner,
    );

    if (!teamMatch) {
      return { credited: 0, created: 0 };
    }

    // Load team users
    const team = teamMatch.team;
    const users = team?.users || [];

    // If no users, return early
    if (users.length === 0) {
      return { credited: 0, created: 0 };
    }

    let credited = 0;
    let created = 0;

    for (const user of users) {
      const existingTourCoin = await TourCoinRepository.findByUserId(user.id);

      await TourCoinRepository.upsertCoins(user.id, amountTourCoins);

      if (existingTourCoin) {
        credited++;
      } else {
        created++;
      }
    }

    return { credited, created };
  }
}
