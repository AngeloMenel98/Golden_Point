// Mock data source
jest.mock("../src/data-source");

import { TournamentService } from "../src/services/tournamentService";
import { MatchRepository, KNOCKOUT_STAGES } from "../src/repository/match.repository";
import { CreateMockHelper } from "./helpers/createMockHelper";

describe("Integration: Knockout Trigger Flow", () => {
  let tournamentService: TournamentService;

  const tournamentId = "tournament-integration-123";
  const categoryId = "category-integration-456";

  const helper = new CreateMockHelper(tournamentId, categoryId);

  beforeEach(() => {
    jest.clearAllMocks();
    tournamentService = new TournamentService();
    
    // Mock findById to return a valid tournament (bypasses TournamentRepository mocking)
    jest.spyOn(tournamentService as any, 'findById').mockResolvedValue({
      id: tournamentId,
      title: "Test Tournament",
      master: 100,
      isDeleted: false,
      status: 1,
      teams: [],
      categories: [],
      matches: [],
    });
  });

  describe("Full flow: Last group match completes → Quarterfinals created", () => {
    it("should create quarterfinals after all group matches complete", async () => {
      const groupMatches = helper.createCompleteGroupStage();
      const remainingHours = helper.createRemainingHours(4);
      const clubData = helper.createClubData();

      // Mock repository methods
      jest.spyOn(MatchRepository, 'getGroupStageMatches').mockResolvedValue(groupMatches as any);
      jest.spyOn(MatchRepository, 'hasKnockoutMatches').mockImplementation(
        (_, __, stage: string) => {
          if (stage === KNOCKOUT_STAGES.CUARTOS) return Promise.resolve(false);
          if (stage === KNOCKOUT_STAGES.SEMIFINAL) return Promise.resolve(false);
          if (stage === KNOCKOUT_STAGES.FINAL) return Promise.resolve(false);
          return Promise.resolve(false);
        }
      );

      jest.spyOn(tournamentService, "getRemainingHours").mockResolvedValue(remainingHours);
      jest.spyOn(tournamentService as any, "getDataForStartingTournament").mockResolvedValue({ clubData, teamData: [] });
      jest.spyOn(tournamentService as any, "getHoursOfMatches").mockResolvedValue(undefined as any);

      const createdCuartosMatches = [
        helper.createMatch("new-cuartos-1", KNOCKOUT_STAGES.CUARTOS),
        helper.createMatch("new-cuartos-2", KNOCKOUT_STAGES.CUARTOS),
        helper.createMatch("new-cuartos-3", KNOCKOUT_STAGES.CUARTOS),
        helper.createMatch("new-cuartos-4", KNOCKOUT_STAGES.CUARTOS),
      ];
      jest.spyOn(tournamentService as any, "createNextMatches").mockResolvedValue(createdCuartosMatches as any);

      const result = await tournamentService.processKnockoutProgression(
        tournamentId,
        categoryId
      );

      expect(result).not.toBeNull();
      expect(result!.stage).toBe(KNOCKOUT_STAGES.CUARTOS);
      expect(result!.matchesCreated).toBe(4);
      // teams.length depends on how many teams qualify from the group stage
      expect(result!.teams.length).toBeGreaterThanOrEqual(4);
    });

    it("should NOT create quarterfinals twice (idempotency)", async () => {
      const groupMatches = helper.createCompleteGroupStage();

      jest.spyOn(MatchRepository, 'getGroupStageMatches').mockResolvedValue(groupMatches as any);
      jest.spyOn(MatchRepository, 'hasKnockoutMatches').mockResolvedValue(true);

      const result = await tournamentService.processKnockoutProgression(
        tournamentId,
        categoryId
      );

      expect(result).toBeNull();
    });

    it("should handle complete flow: group → cuartos → semis", async () => {
      const groupMatches = helper.createCompleteGroupStage();
      const remainingHours = helper.createRemainingHours(8);
      const clubData = helper.createClubData();

      jest.spyOn(MatchRepository, 'getGroupStageMatches').mockResolvedValue(groupMatches as any);
      jest.spyOn(MatchRepository, 'hasKnockoutMatches').mockImplementation(
        (_, __, stage: string) => {
          if (stage === KNOCKOUT_STAGES.CUARTOS) return Promise.resolve(false);
          if (stage === KNOCKOUT_STAGES.SEMIFINAL) return Promise.resolve(false);
          if (stage === KNOCKOUT_STAGES.FINAL) return Promise.resolve(false);
          return Promise.resolve(false);
        }
      );
      jest.spyOn(tournamentService, "getRemainingHours").mockResolvedValue(remainingHours);
      jest.spyOn(tournamentService as any, "getDataForStartingTournament").mockResolvedValue({ clubData, teamData: [] });
      jest.spyOn(tournamentService as any, "getHoursOfMatches").mockResolvedValue(undefined as any);

      const cuartosMatches = [
        helper.createMatch("cuartos-1", KNOCKOUT_STAGES.CUARTOS),
        helper.createMatch("cuartos-2", KNOCKOUT_STAGES.CUARTOS),
        helper.createMatch("cuartos-3", KNOCKOUT_STAGES.CUARTOS),
        helper.createMatch("cuartos-4", KNOCKOUT_STAGES.CUARTOS),
      ];

      let callCount = 0;
      jest.spyOn(tournamentService as any, "createNextMatches").mockImplementation(() => {
        callCount++;
        if (callCount === 1) return Promise.resolve(cuartosMatches as any);
        if (callCount === 2) return Promise.resolve([
          helper.createMatch("semis-1", KNOCKOUT_STAGES.SEMIFINAL),
          helper.createMatch("semis-2", KNOCKOUT_STAGES.SEMIFINAL),
        ] as any);
        return Promise.resolve([helper.createMatch("final-1", KNOCKOUT_STAGES.FINAL)] as any);
      });

      // Act: Create quarterfinals
      const step1Result = await tournamentService.processKnockoutProgression(
        tournamentId,
        categoryId
      );

      expect(step1Result).not.toBeNull();
      expect(step1Result!.stage).toBe(KNOCKOUT_STAGES.CUARTOS);
      expect(step1Result!.matchesCreated).toBe(4);

      // Reset mocks for step 2
      jest.clearAllMocks();

      // Step 2: Quarterfinals complete, create semifinals
      const cuartosWithWinners = cuartosMatches.map((m, i) => ({
        ...m,
        teamMatches: [
          { teamId: `team-${i}-winner`, isWinner: true },
          { teamId: `team-${i}-loser`, isWinner: false },
        ],
      }));

      // Re-mock findById for step 2
      jest.spyOn(tournamentService as any, 'findById').mockResolvedValue({
        id: tournamentId,
        title: "Test Tournament",
        master: 100,
        isDeleted: false,
        status: 1,
        teams: [],
        categories: [],
        matches: [],
      });
      jest.spyOn(MatchRepository, 'getGroupStageMatches').mockResolvedValue(groupMatches as any);
      jest.spyOn(MatchRepository, 'hasKnockoutMatches').mockImplementation(
        (_, __, stage: string) => {
          if (stage === KNOCKOUT_STAGES.CUARTOS) return Promise.resolve(true);
          if (stage === KNOCKOUT_STAGES.SEMIFINAL) return Promise.resolve(false);
          if (stage === KNOCKOUT_STAGES.FINAL) return Promise.resolve(false);
          return Promise.resolve(false);
        }
      );
      jest.spyOn(MatchRepository, 'getKnockoutMatches').mockImplementation(
        (_, __, stage: string) => {
          if (stage === KNOCKOUT_STAGES.CUARTOS) return Promise.resolve(cuartosWithWinners as any);
          return Promise.resolve([] as any);
        }
      );
      jest.spyOn(tournamentService, "getRemainingHours").mockResolvedValue(remainingHours);
      jest.spyOn(tournamentService as any, "getDataForStartingTournament").mockResolvedValue({ clubData, teamData: [] });

      const step2Result = await tournamentService.processKnockoutProgression(
        tournamentId,
        categoryId
      );

      expect(step2Result).not.toBeNull();
      expect(step2Result!.stage).toBe(KNOCKOUT_STAGES.SEMIFINAL);
      expect(step2Result!.matchesCreated).toBe(2);
    });
  });

  describe("Error scenarios", () => {
    // These tests are covered by tournamentService.test.ts with more complete mocking
    // Skipping here due to complexity of mocking all repository dependencies
  });
});
