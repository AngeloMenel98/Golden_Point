import { MatchService } from "../src/services/matchService";
import { TournamentService } from "../src/services/tournamentService";
import { MatchRepository } from "../src/repository/match.repository";
import { KNOCKOUT_STAGES } from "../src/repository/match.repository";
import { KnockoutResult } from "../src/types/dto/tournament.dto";

// Mock the TournamentService
jest.mock("../src/services/tournamentService");
// Mock MatchRepository
jest.mock("../src/repository/match.repository");

describe("MatchService - Knockout Trigger", () => {
  let matchService: MatchService;
  let mockProcessKnockoutProgression: jest.Mock;

  const matchId = "match-123";
  const tournamentId = "tournament-123";
  const categoryId = "category-456";

  const mockMatchWithTeams = {
    id: matchId,
    tournament: { id: tournamentId },
    teamMatches: [
      { team: { id: "team-1", category: categoryId } },
      { team: { id: "team-2", category: categoryId } },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock processKnockoutProgression on TournamentService
    mockProcessKnockoutProgression = jest.fn();
    (TournamentService.prototype as any).processKnockoutProgression = mockProcessKnockoutProgression;

    matchService = new MatchService();

    // Mock MatchRepository.findMatchWithTeams
    (MatchRepository.findMatchWithTeams as jest.Mock) = jest.fn();
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

      (MatchRepository.findMatchWithTeams as jest.Mock).mockResolvedValue(mockMatchWithTeams);
      mockProcessKnockoutProgression.mockResolvedValue(expectedResult);

      const result = await matchService.checkKnockoutTrigger(matchId);

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
      (MatchRepository.findMatchWithTeams as jest.Mock).mockResolvedValue(mockMatchWithTeams);
      mockProcessKnockoutProgression.mockResolvedValue(null);

      const result = await matchService.checkKnockoutTrigger(matchId);

      expect(result.triggered).toBe(false);
      expect(result.result).toBeUndefined();
    });

    it("should return triggered=false when error occurs (graceful degradation)", async () => {
      (MatchRepository.findMatchWithTeams as jest.Mock).mockResolvedValue(mockMatchWithTeams);
      mockProcessKnockoutProgression.mockRejectedValue(
        new Error("Database error")
      );

      const result = await matchService.checkKnockoutTrigger(matchId);

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

      (MatchRepository.findMatchWithTeams as jest.Mock).mockResolvedValue(mockMatchWithTeams);
      mockProcessKnockoutProgression.mockResolvedValue(expectedResult);

      const result = await matchService.checkKnockoutTrigger(matchId);

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

      (MatchRepository.findMatchWithTeams as jest.Mock).mockResolvedValue(mockMatchWithTeams);
      mockProcessKnockoutProgression.mockResolvedValue(expectedResult);

      const result = await matchService.checkKnockoutTrigger(matchId);

      expect(result.triggered).toBe(true);
      expect(result.result!.stage).toBe(KNOCKOUT_STAGES.FINAL);
      expect(result.result!.matchesCreated).toBe(1);
    });

    it("should return triggered=false when match not found", async () => {
      (MatchRepository.findMatchWithTeams as jest.Mock).mockResolvedValue(null);

      const result = await matchService.checkKnockoutTrigger(matchId);

      expect(result.triggered).toBe(false);
      expect(result.result).toBeUndefined();
    });

    it("should return triggered=false when no category on team", async () => {
      (MatchRepository.findMatchWithTeams as jest.Mock).mockResolvedValue({
        ...mockMatchWithTeams,
        teamMatches: [{ team: {} }],
      });

      const result = await matchService.checkKnockoutTrigger(matchId);

      expect(result.triggered).toBe(false);
    });
  });
});
