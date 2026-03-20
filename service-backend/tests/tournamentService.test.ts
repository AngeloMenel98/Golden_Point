// Mock data source
jest.mock("../src/data-source");

import { TournamentService } from "../src/services/tournamentService";
import { MatchRepository, KNOCKOUT_STAGES } from "../src/repository/match.repository";
import { TournamentRepository } from "../src/repository";

describe("TournamentService - Knockout Automation", () => {
  // Test fixtures
  const tournamentId = "tournament-123";
  const categoryId = "category-456";

  // Helper to create a service with mocked methods
  const createServiceWithMocks = () => {
    const service = new TournamentService();
    
    // Mock findById to return a valid tournament
    jest.spyOn(service as any, 'findById').mockResolvedValue({
      id: tournamentId,
      title: "Test Tournament",
      master: 100,
      isDeleted: false,
      status: "IN_PROGRESS",
      teams: [],
      categories: [],
      matches: [],
    });
    
    return service;
  };

  describe("checkCategoryGroupStageComplete", () => {
    it("should return complete=false when no group matches exist", async () => {
      jest.spyOn(MatchRepository, 'getGroupStageMatches').mockResolvedValue([]);
      
      const service = createServiceWithMocks();
      const result = await service.checkCategoryGroupStageComplete(
        tournamentId,
        categoryId
      );

      expect(result.complete).toBe(false);
      expect(result.teams).toBeUndefined();
    });

    it("should return complete=false when some matches are incomplete", async () => {
      const groupStage = { id: "group-1", groupStage: "Grupo 1", matches: [] };
      const team1 = { id: "team-1", teamName: "Team 1", category: "Masculino", users: [], teamMatches: [], tournament: {} };
      const team2 = { id: "team-2", teamName: "Team 2", category: "Masculino", users: [], teamMatches: [], tournament: {} };

      // Match without winner
      const incompleteMatch = {
        id: "match-1",
        amountTourPoints: 100,
        amountTourCoins: 50,
        matchDate: "2024-09-01T10:00:00Z",
        tournament: {},
        court: {},
        teamMatches: [
          { teamId: "team-1", matchId: "", isWinner: false, team: team1, match: {} },
          { teamId: "team-2", matchId: "", isWinner: false, team: team2, match: {} },
        ],
        sets: [],
        groupStage,
      };

      jest.spyOn(MatchRepository, 'getGroupStageMatches').mockResolvedValue([incompleteMatch] as any);
      
      const service = createServiceWithMocks();
      const result = await service.checkCategoryGroupStageComplete(
        tournamentId,
        categoryId
      );

      expect(result.complete).toBe(false);
    });

    it("should return complete=true with qualified teams when all matches have winners", async () => {
      const groupStage1 = { id: "group-1", groupStage: "Grupo 1", matches: [] };
      const groupStage2 = { id: "group-2", groupStage: "Grupo 2", matches: [] };

      const createTeam = (id: string) => ({ 
        id, teamName: `Team ${id}`, category: "Masculino", users: [], teamMatches: [], tournament: {} 
      });
      const createTeamMatch = (teamId: string, isWinner: boolean, team: any) => ({ 
        teamId, matchId: "", isWinner, team, match: {} 
      });
      const createMatch = (id: string, stage: any, teamMatches: any[]) => ({
        id, amountTourPoints: 100, amountTourCoins: 50, matchDate: "2024-09-01T10:00:00Z",
        tournament: {}, court: {}, teamMatches, sets: [], groupStage: stage,
      });

      // All matches with winners
      const matches = [
        createMatch("match-1", groupStage1, [createTeamMatch("team-1", true, createTeam("team-1")), createTeamMatch("team-2", false, createTeam("team-2"))]),
        createMatch("match-2", groupStage1, [createTeamMatch("team-1", true, createTeam("team-1")), createTeamMatch("team-3", false, createTeam("team-3"))]),
        createMatch("match-3", groupStage1, [createTeamMatch("team-2", true, createTeam("team-2")), createTeamMatch("team-3", false, createTeam("team-3"))]),
        createMatch("match-4", groupStage2, [createTeamMatch("team-4", true, createTeam("team-4")), createTeamMatch("team-5", false, createTeam("team-5"))]),
        createMatch("match-5", groupStage2, [createTeamMatch("team-4", true, createTeam("team-4")), createTeamMatch("team-6", false, createTeam("team-6"))]),
        createMatch("match-6", groupStage2, [createTeamMatch("team-5", true, createTeam("team-5")), createTeamMatch("team-6", false, createTeam("team-6"))]),
      ];

      jest.spyOn(MatchRepository, 'getGroupStageMatches').mockResolvedValue(matches as any);
      
      const service = createServiceWithMocks();
      const result = await service.checkCategoryGroupStageComplete(
        tournamentId,
        categoryId
      );

      expect(result.complete).toBe(true);
      expect(result.teams).toBeDefined();
      expect(result.teams!.length).toBe(4); // 2 teams per group
    });
  });

  describe("checkKnockoutStageComplete", () => {
    it("should return complete=false when no knockout matches exist", async () => {
      jest.spyOn(MatchRepository, 'getKnockoutMatches').mockResolvedValue([]);
      
      const service = createServiceWithMocks();
      const result = await service.checkKnockoutStageComplete(
        tournamentId,
        categoryId,
        KNOCKOUT_STAGES.CUARTOS
      );

      expect(result.complete).toBe(false);
      expect(result.winners).toBeUndefined();
    });

    it("should return complete=false when some knockout matches are incomplete", async () => {
      const cuartosStage = { id: "cuartos-1", groupStage: KNOCKOUT_STAGES.CUARTOS, matches: [] };
      const team1 = { id: "team-1", teamName: "Team 1", category: "Masculino", users: [], teamMatches: [], tournament: {} };
      const team2 = { id: "team-2", teamName: "Team 2", category: "Masculino", users: [], teamMatches: [], tournament: {} };

      const incompleteMatch = {
        id: "cuartos-match-1",
        amountTourPoints: 100,
        amountTourCoins: 50,
        matchDate: "2024-09-01T10:00:00Z",
        tournament: {},
        court: {},
        teamMatches: [
          { teamId: "team-1", matchId: "", isWinner: false, team: team1, match: {} },
          { teamId: "team-2", matchId: "", isWinner: false, team: team2, match: {} },
        ],
        sets: [],
        groupStage: cuartosStage,
      };

      jest.spyOn(MatchRepository, 'getKnockoutMatches').mockResolvedValue([incompleteMatch] as any);
      
      const service = createServiceWithMocks();
      const result = await service.checkKnockoutStageComplete(
        tournamentId,
        categoryId,
        KNOCKOUT_STAGES.CUARTOS
      );

      expect(result.complete).toBe(false);
    });

    it("should return complete=true with winners when all quarterfinals are complete", async () => {
      const cuartosStage = { id: "cuartos-1", groupStage: KNOCKOUT_STAGES.CUARTOS, matches: [] };
      const createTeam = (id: string) => ({ id, teamName: `Team ${id}`, category: "Masculino", users: [], teamMatches: [], tournament: {} });
      const createTeamMatch = (teamId: string, isWinner: boolean, team: any) => ({ teamId, matchId: "", isWinner, team, match: {} });

      const cuartoMatch1 = {
        id: "cuartos-1",
        amountTourPoints: 100,
        amountTourCoins: 50,
        matchDate: "2024-09-01T10:00:00Z",
        tournament: {},
        court: {},
        teamMatches: [
          createTeamMatch("team-1", true, createTeam("team-1")),
          createTeamMatch("team-2", false, createTeam("team-2")),
        ],
        sets: [],
        groupStage: cuartosStage,
      };

      const cuartoMatch2 = {
        id: "cuartos-2",
        amountTourPoints: 100,
        amountTourCoins: 50,
        matchDate: "2024-09-01T10:00:00Z",
        tournament: {},
        court: {},
        teamMatches: [
          createTeamMatch("team-3", true, createTeam("team-3")),
          createTeamMatch("team-4", false, createTeam("team-4")),
        ],
        sets: [],
        groupStage: cuartosStage,
      };

      jest.spyOn(MatchRepository, 'getKnockoutMatches').mockResolvedValue([cuartoMatch1, cuartoMatch2] as any);
      
      const service = createServiceWithMocks();
      const result = await service.checkKnockoutStageComplete(
        tournamentId,
        categoryId,
        KNOCKOUT_STAGES.CUARTOS
      );

      expect(result.complete).toBe(true);
      expect(result.winners).toBeDefined();
      expect(result.winners!.length).toBe(2);
    });
  });

  describe("processKnockoutProgression - Idempotency", () => {
    it("should NOT create duplicates - quarterfinals already exist", async () => {
      const groupStage1 = { id: "group-1", groupStage: "Grupo 1", matches: [] };
      const createTeam = (id: string) => ({ id, teamName: `Team ${id}`, category: "Masculino", users: [], teamMatches: [], tournament: {} });
      const createTeamMatch = (teamId: string, isWinner: boolean, team: any) => ({ teamId, matchId: "", isWinner, team, match: {} });

      const match1 = {
        id: "match-1",
        amountTourPoints: 100,
        amountTourCoins: 50,
        matchDate: "2024-09-01T10:00:00Z",
        tournament: {},
        court: {},
        teamMatches: [
          createTeamMatch("team-1", true, createTeam("team-1")),
          createTeamMatch("team-2", false, createTeam("team-2")),
        ],
        sets: [],
        groupStage: groupStage1,
      };

      const match2 = {
        id: "match-2",
        amountTourPoints: 100,
        amountTourCoins: 50,
        matchDate: "2024-09-01T10:00:00Z",
        tournament: {},
        court: {},
        teamMatches: [
          createTeamMatch("team-3", true, createTeam("team-3")),
          createTeamMatch("team-4", false, createTeam("team-4")),
        ],
        sets: [],
        groupStage: groupStage1,
      };

      jest.spyOn(MatchRepository, 'getGroupStageMatches').mockResolvedValue([match1, match2] as any);
      jest.spyOn(MatchRepository, 'hasKnockoutMatches').mockResolvedValue(true);
      
      const service = createServiceWithMocks();
      const result = await service.processKnockoutProgression(
        tournamentId,
        categoryId
      );

      expect(result).toBeNull();
    });
  });
});
