import { Entity, ManyToOne, PrimaryColumn, Column, CreateDateColumn, Index } from "typeorm";
import { Team } from "./Team";
import { Match } from "./Match";

@Entity()
@Index("IDX_TEAM_MATCH_TEAM", ["team"])
@Index("IDX_TEAM_MATCH_MATCH", ["match"])
export class TeamMatch {
  @PrimaryColumn()
  teamId: string;

  @PrimaryColumn()
  matchId: string;

  @Column({ default: false })
  isWinner: boolean;

  @Column({ type: "integer", nullable: true })
  position: number; // 1 or 2 - position in the match (team1 or team2)

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @ManyToOne(() => Team, (team) => team.teamMatches)
  team: Team;

  @ManyToOne(() => Match, (match) => match.teamMatches)
  match: Match;
}
