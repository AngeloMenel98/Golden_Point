import { MatchService } from "../src/services/matchService";
import { TournamentService } from "../src/services/tournamentService";
import { KNOCKOUT_STAGES } from "../src/repository/match.repository";
import { KnockoutResult } from "../src/types/dto/tournament.dto";

// Mock the TournamentService
jest.mock("../src/services/tournamentService");

describe("MatchService - Knockout Trigger", () => {
  let matchService: MatchService;
  let mockProcessKnockoutProgression: jest.Mock;

  const tournamentId = "tournament-123";
  const categoryId = "category-456";

  beforeEach(() => {
    jest.clearAllMocks();
    
    matchService = new MatchService();
    
    // Access and mock the tournamentService
    mockProcessKnockoutProgression = jest.fn();
    (matchService as any).tournamentService.processKnockoutProgression = mockProcessKnockoutProgression;
  });

  describe("checkKnockoutTrigger", () => {
    it("should return triggered=true when knockout progression succeeds", async () => {
      const expectedResult: KnockoutResult = {
        stage: KNOCKOUT_STAGES.CUARTOS,
        matchesCreated: 4,
        teams: [
          "team-1",
          "team-2",
          "team-3",
          "team-4",
          "team-5",
          "team-6",
          "team-7",
          "team-8",
        ],
      };

      mockProcessKnockoutProgression.mockResolvedValue(expectedResult);

      const result = await matchService.checkKnockoutTrigger(
        tournamentId,
        categoryId
      );

      expect(result.triggered).toBe(true);
      expect(result.result).toBeDefined();
      expect(result.result!.stage).toBe(KNOCKOUT_STAGES.CUARTOS);
      expect(result.result!.matchesCreated).toBe(4);

      expect(mockProcessKnockoutProgression).toHaveBeenCalledWith(
        tournamentId,
        categoryId
      );
    });

    it("should return triggered=false when no progression needed", async () => {
      mockProcessKnockoutProgression.mockResolvedValue(null);

      const result = await matchService.checkKnockoutTrigger(
        tournamentId,
        categoryId
      );

      expect(result.triggered).toBe(false);
      expect(result.result).toBeUndefined();
    });

    it("should return triggered=false when error occurs (graceful degradation)", async () => {
      mockProcessKnockoutProgression.mockRejectedValue(
        new Error("Database error")
      );

      const result = await matchService.checkKnockoutTrigger(
        tournamentId,
        categoryId
      );

      // Should not throw - graceful degradation
      expect(result.triggered).toBe(false);
      expect(result.result).toBeUndefined();
    });

    it("should trigger for semifinals when quarterfinals complete", async () => {
      const expectedResult: KnockoutResult = {
        stage: KNOCKOUT_STAGES.SEMIFINAL,
        matchesCreated: 2,
        teams: ["team-1", "team-2", "team-3", "team-4"],
      };

      mockProcessKnockoutProgression.mockResolvedValue(expectedResult);

      const result = await matchService.checkKnockoutTrigger(
        tournamentId,
        categoryId
      );

      expect(result.triggered).toBe(true);
      expect(result.result!.stage).toBe(KNOCKOUT_STAGES.SEMIFINAL);
      expect(result.result!.matchesCreated).toBe(2);
    });

    it("should trigger for final when semifinals complete", async () => {
      const expectedResult: KnockoutResult = {
        stage: KNOCKOUT_STAGES.FINAL,
        matchesCreated: 1,
        teams: ["team-1", "team-2"],
      };

      mockProcessKnockoutProgression.mockResolvedValue(expectedResult);

      const result = await matchService.checkKnockoutTrigger(
        tournamentId,
        categoryId
      );

      expect(result.triggered).toBe(true);
      expect(result.result!.stage).toBe(KNOCKOUT_STAGES.FINAL);
      expect(result.result!.matchesCreated).toBe(1);
    });
  });
});
