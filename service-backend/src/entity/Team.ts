import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  Index,
} from "typeorm";
import { User } from "./User";
import { TeamMatch } from "./TeamMatch";
import { Tournament } from "./Tournament";

@Entity()
@Index("IDX_TEAM_TOURNAMENT", ["tournament"])
export class Team {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  teamName: string;

  @Column({ length: 50 })
  category: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @ManyToMany(() => User, (user) => user.teams)
  @JoinTable()
  users: User[];

  @OneToMany(() => TeamMatch, (teamMatch) => teamMatch.team)
  teamMatches: TeamMatch[];

  @ManyToOne(() => Tournament, (tournament) => tournament.teams)
  tournament: Tournament;
}
