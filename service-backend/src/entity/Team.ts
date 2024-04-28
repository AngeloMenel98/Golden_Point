import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { TeamMatch } from "./TeamMatch";
import { Tournament } from "./Tournament";

@Entity()
export class Team {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  teamName: string;

  @Column({ length: 50 })
  category: string;

  @ManyToMany(() => User, (user) => user.teams)
  @JoinTable()
  users: User[];

  @OneToMany(() => TeamMatch, (teamMatch) => teamMatch.team)
  teamMatches: TeamMatch[];

  @ManyToOne(() => Tournament, (tournament) => tournament.teams)
  tournament: Tournament;
}
