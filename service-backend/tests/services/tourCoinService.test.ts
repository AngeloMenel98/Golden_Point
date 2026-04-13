import "reflect-metadata";

import { TourCoinService } from "../../src/services/tourCoinService";
import { TourCoinRepository } from "../../src/repository/tourCoin.repository";
import { TeamMatchRepository } from "../../src/repository/teamMatch.repository";

// Mock repositories
jest.mock("../../src/repository/tourCoin.repository");
jest.mock("../../src/repository/teamMatch.repository");

describe("TourCoinService - creditWinnerTeam", () => {
  let tourCoinService: TourCoinService;

  beforeEach(() => {
    jest.clearAllMocks();
    tourCoinService = new TourCoinService();
  });

  describe("creditWinnerTeam", () => {
    it("should return { credited: 0, created: 0 } when amountTourCoins is 0", async () => {
      const result = await tourCoinService.creditWinnerTeam("match-123", 1, 0);

      expect(result).toEqual({ credited: 0, created: 0 });
    });

    it("should return { credited: 0, created: 0 } when amountTourCoins is null", async () => {
      const result = await tourCoinService.creditWinnerTeam(
        "match-123",
        1,
        null as any
      );

      expect(result).toEqual({ credited: 0, created: 0 });
    });

    it("should return { credited: 0, created: 0 } when TeamMatch not found", async () => {
      (TeamMatchRepository.findByMatchAndPosition as jest.Mock).mockResolvedValue(
        null
      );

      const result = await tourCoinService.creditWinnerTeam("match-123", 1, 100);

      expect(result).toEqual({ credited: 0, created: 0 });
      expect(TeamMatchRepository.findByMatchAndPosition).toHaveBeenCalledWith(
        "match-123",
        1
      );
    });

    it("should return { credited: 0, created: 0 } when team has no users", async () => {
      const mockTeamMatch = {
        teamId: "team-1",
        matchId: "match-123",
        position: 1,
        isWinner: false,
        team: { id: "team-1", users: [] },
      };

      (TeamMatchRepository.findByMatchAndPosition as jest.Mock).mockResolvedValue(
        mockTeamMatch
      );

      const result = await tourCoinService.creditWinnerTeam("match-123", 1, 100);

      expect(result).toEqual({ credited: 0, created: 0 });
    });

    it("should create new TourCoin when user has none", async () => {
      const mockTeamMatch = {
        teamId: "team-1",
        matchId: "match-123",
        position: 1,
        isWinner: false,
        team: {
          id: "team-1",
          users: [{ id: "user-1" }, { id: "user-2" }],
        },
      };

      (TeamMatchRepository.findByMatchAndPosition as jest.Mock).mockResolvedValue(
        mockTeamMatch
      );
      (TourCoinRepository.findByUserId as jest.Mock).mockResolvedValue(null);
      (TourCoinRepository.upsertCoins as jest.Mock).mockResolvedValue(undefined);

      const result = await tourCoinService.creditWinnerTeam("match-123", 1, 100);

      expect(result.credited).toBe(0);
      expect(result.created).toBe(2);
      expect(TourCoinRepository.upsertCoins).toHaveBeenCalledTimes(2);
      expect(TourCoinRepository.upsertCoins).toHaveBeenCalledWith("user-1", 100);
      expect(TourCoinRepository.upsertCoins).toHaveBeenCalledWith("user-2", 100);
    });

    it("should increment coins when user already has TourCoin", async () => {
      const mockTeamMatch = {
        teamId: "team-1",
        matchId: "match-123",
        position: 1,
        isWinner: false,
        team: {
          id: "team-1",
          users: [{ id: "user-1" }],
        },
      };

      (TeamMatchRepository.findByMatchAndPosition as jest.Mock).mockResolvedValue(
        mockTeamMatch
      );
      (TourCoinRepository.findByUserId as jest.Mock).mockResolvedValue({
        id: "tourcoin-1",
        coins: 50,
        user: { id: "user-1" },
      });
      (TourCoinRepository.upsertCoins as jest.Mock).mockResolvedValue(undefined);

      const result = await tourCoinService.creditWinnerTeam("match-123", 1, 100);

      expect(result.credited).toBe(1);
      expect(result.created).toBe(0);
      expect(TourCoinRepository.upsertCoins).toHaveBeenCalledWith("user-1", 100);
    });

    it("should handle mixed scenario - some users have TourCoin, some don't", async () => {
      const mockTeamMatch = {
        teamId: "team-1",
        matchId: "match-123",
        position: 1,
        isWinner: false,
        team: {
          id: "team-1",
          users: [{ id: "user-1" }, { id: "user-2" }],
        },
      };

      (TeamMatchRepository.findByMatchAndPosition as jest.Mock).mockResolvedValue(
        mockTeamMatch
      );
      (TourCoinRepository.findByUserId as jest.Mock).mockResolvedValueOnce({
        id: "tourcoin-1",
        coins: 50,
        user: { id: "user-1" },
      });
      (TourCoinRepository.findByUserId as jest.Mock).mockResolvedValueOnce(null);
      (TourCoinRepository.upsertCoins as jest.Mock).mockResolvedValue(undefined);

      const result = await tourCoinService.creditWinnerTeam("match-123", 1, 100);

      expect(result.credited).toBe(1);
      expect(result.created).toBe(1);
      expect(TourCoinRepository.upsertCoins).toHaveBeenCalledTimes(2);
    });
  });
});
