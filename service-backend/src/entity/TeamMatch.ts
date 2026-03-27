import { Entity, ManyToOne, PrimaryColumn, Column, CreateDateColumn } from "typeorm";
import { Team } from "./Team";
import { Match } from "./Match";

@Entity()
export class TeamMatch {
  @PrimaryColumn()
  teamId: string;

  @PrimaryColumn()
  matchId: string;

  @Column({ default: false })
  isWinner: boolean;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @ManyToOne(() => Team, (team) => team.teamMatches)
  team: Team;

  @ManyToOne(() => Match, (match) => match.teamMatches)
  match: Match;
}
