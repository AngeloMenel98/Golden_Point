import { Match, TeamMatch, Team, GroupStage, Tournament, Court, Category } from "../../src/entity";
import { KNOCKOUT_STAGES } from "../../src/repository/match.repository";

export class CreateMockHelper {
  constructor(
    private tournamentId: string,
    private categoryId: string
  ) {}

  createGroupStage(id: string, name: string): GroupStage {
    return {
      id,
      groupStage: name,
      matches: [],
      createdAt: new Date(),
    };
  }

  createTeam(id: string, name: string): Team {
    return {
      id,
      teamName: name,
      category: "Masculino",
      users: [],
      teamMatches: [],
      tournament: {} as Tournament,
      createdAt: new Date(),
    };
  }

  createTeamMatch(
    teamId: string,
    team: Team,
    isWinner: boolean,
    position?: number
  ): TeamMatch {
    return {
      teamId,
      matchId: "",
      isWinner,
      position: position || 1,
      team,
      match: {} as Match,
      createdAt: new Date(),
    };
  }

  createMatch(id: string, stageName: string): Match {
    return {
      id,
      amountTourPoints: 100,
      amountTourCoins: 50,
      matchDate: new Date().toISOString(),
      tournament: this.createTournament(),
      court: this.createCourt(),
      teamMatches: [],
      sets: [],
      groupStage: this.createGroupStage(`group-${id}`, stageName),
      createdAt: new Date(),
    };
  }

  createTournament(): Tournament {
    return {
      id: this.tournamentId,
      title: "Test Tournament",
      master: 100,
      isDeleted: false,
      status: "IN_PROGRESS" as any,
      teams: [],
      categories: [],
      matches: [],
      tour: {} as any,
      createdAt: new Date(),
    } as Tournament;
  }

  createCourt(): Court {
    return {
      id: "court-1",
      courtNumber: 1,
      club: {} as any,
      matches: [],
      createdAt: new Date(),
    };
  }

  /**
   * Create a complete group stage with 6 teams in 2 groups
   * Returns 6 matches (3 per group) with winners determined
   */
  createCompleteGroupStage(): Match[] {
    // Group 1
    const group1 = this.createGroupStage("group-1", "Grupo 1");
    const g1t1 = this.createTeam("g1-team-1", "Group1 Team 1");
    const g1t2 = this.createTeam("g1-team-2", "Group1 Team 2");
    const g1t3 = this.createTeam("g1-team-3", "Group1 Team 3");

    // Group 2
    const group2 = this.createGroupStage("group-2", "Grupo 2");
    const g2t1 = this.createTeam("g2-team-1", "Group2 Team 1");
    const g2t2 = this.createTeam("g2-team-2", "Group2 Team 2");
    const g2t3 = this.createTeam("g2-team-3", "Group2 Team 3");

    return [
      // Group 1 matches (all complete)
      this.createMatchWithTeams("m1", group1, [
        { team: g1t1, isWinner: true },
        { team: g1t2, isWinner: false },
      ]),
      this.createMatchWithTeams("m2", group1, [
        { team: g1t1, isWinner: true },
        { team: g1t3, isWinner: false },
      ]),
      this.createMatchWithTeams("m3", group1, [
        { team: g1t2, isWinner: true },
        { team: g1t3, isWinner: false },
      ]),
      // Group 2 matches (all complete)
      this.createMatchWithTeams("m4", group2, [
        { team: g2t1, isWinner: true },
        { team: g2t2, isWinner: false },
      ]),
      this.createMatchWithTeams("m5", group2, [
        { team: g2t1, isWinner: true },
        { team: g2t3, isWinner: false },
      ]),
      this.createMatchWithTeams("m6", group2, [
        { team: g2t2, isWinner: true },
        { team: g2t3, isWinner: false },
      ]),
    ];
  }

  private createMatchWithTeams(
    id: string,
    groupStage: GroupStage,
    teams: { team: Team; isWinner: boolean }[]
  ): Match {
    const match = this.createMatch(id, groupStage.groupStage);
    match.groupStage = groupStage;
    match.teamMatches = teams.map((t) =>
      this.createTeamMatch(t.team.id, t.team, t.isWinner)
    );
    return match;
  }

  createRemainingHours(count: number): Date[] {
    const hours: Date[] = [];
    const baseDate = new Date("2024-09-05T08:00:00Z");
    
    for (let i = 0; i < count; i++) {
      const hour = new Date(baseDate.getTime() + i * 30 * 60 * 1000); // 30 min intervals
      hours.push(hour);
    }
    
    return hours;
  }

  createClubData() {
    return [
      {
        clubName: "Test Club",
        master: 100,
        avFrom: new Date("2024-09-05T08:00:00Z"),
        avTo: new Date("2024-09-05T20:00:00Z"),
        allHours: this.createRemainingHours(24),
        ctNumbers: ["court-1", "court-2"],
        categories: ["Masculino"],
      },
    ];
  }

  /**
   * Create knockout matches with winners
   */
  createCompleteKnockoutStage(
    stageName: string,
    matchCount: number
  ): Match[] {
    const matches: Match[] = [];
    
    for (let i = 0; i < matchCount; i++) {
      const team1 = this.createTeam(`winner-${i}`, `Winner ${i}`);
      const team2 = this.createTeam(`loser-${i}`, `Loser ${i}`);
      
      const match = this.createMatch(`${stageName}-${i}`, stageName);
      match.teamMatches = [
        this.createTeamMatch(team1.id, team1, true),
        this.createTeamMatch(team2.id, team2, false),
      ];
      
      matches.push(match);
    }
    
    return matches;
  }
}
