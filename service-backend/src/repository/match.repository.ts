import { AppDataSource } from "../data-source";
import { Court, Match, Team, TeamMatch, Tournament } from "../entity";

export const MatchRepository = AppDataSource.getRepository(Match).extend({
  async create(
    match: Match,
    teams: Team[],
    tournament: Tournament,
    court: Court
  ) {
    return this.manager.transaction(async (transactionalEntityManager) => {
      const tt: TeamMatch[] = [];

      const savedMatch = await transactionalEntityManager
        .getRepository(Match)
        .save({ ...match, court, tournament });

      teams.forEach((team) => {
        const teamMatch = new TeamMatch();
        teamMatch.team = team;
        teamMatch.match = savedMatch;

        teamMatch.isWinner = false;
        tt.push(teamMatch);
      });

      await transactionalEntityManager.save(tt);

      return savedMatch;
    });
  },
});
