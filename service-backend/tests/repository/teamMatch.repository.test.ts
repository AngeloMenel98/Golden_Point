import "reflect-metadata";

import { TeamMatchRepository } from "../../src/repository/teamMatch.repository";
import { AppDataSource } from "../../src/data-source";
import { TeamMatch } from "../../src/entity";

describe("TeamMatchRepository - findByMatchAndPosition", () => {
  let mockQueryBuilder: any;

  beforeEach(() => {
    jest.clearAllMocks();
    // Get a fresh mock query builder from the global mock
    mockQueryBuilder = (AppDataSource.getRepository(TeamMatch) as any)
      .createQueryBuilder();
    // Mock the chainable methods to return the query builder
    mockQueryBuilder.innerJoin = jest.fn().mockReturnValue(mockQueryBuilder);
    mockQueryBuilder.innerJoinAndSelect = jest.fn().mockReturnValue(mockQueryBuilder);
    mockQueryBuilder.leftJoinAndSelect = jest.fn().mockReturnValue(mockQueryBuilder);
    mockQueryBuilder.where = jest.fn().mockReturnValue(mockQueryBuilder);
    mockQueryBuilder.andWhere = jest.fn().mockReturnValue(mockQueryBuilder);
    mockQueryBuilder.getOne = jest.fn();
  });

  describe("findByMatchAndPosition", () => {
    it("should find TeamMatch by matchId and position 1", async () => {
      const mockTeamMatch = {
        teamId: "team-1",
        matchId: "match-123",
        isWinner: false,
        position: 1,
      };

      mockQueryBuilder.getOne = jest.fn().mockResolvedValue(mockTeamMatch);

      const result = await TeamMatchRepository.findByMatchAndPosition("match-123", 1);

      expect(result).toEqual(mockTeamMatch);
      expect(mockQueryBuilder.innerJoin).toHaveBeenCalled();
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        "match.id = :matchId",
        { matchId: "match-123" }
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        "teamMatch.position = :position",
        { position: 1 }
      );
      expect(mockQueryBuilder.getOne).toHaveBeenCalled();
    });

    it("should find TeamMatch by matchId and position 2", async () => {
      const mockTeamMatch = {
        teamId: "team-2",
        matchId: "match-123",
        isWinner: true,
        position: 2,
      };

      mockQueryBuilder.getOne = jest.fn().mockResolvedValue(mockTeamMatch);

      const result = await TeamMatchRepository.findByMatchAndPosition("match-123", 2);

      expect(result).toEqual(mockTeamMatch);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        "teamMatch.position = :position",
        { position: 2 }
      );
    });

    it("should return null when no TeamMatch found", async () => {
      mockQueryBuilder.getOne = jest.fn().mockResolvedValue(null);

      const result = await TeamMatchRepository.findByMatchAndPosition(
        "nonexistent-match",
        1
      );

      expect(result).toBeNull();
    });
  });
});
