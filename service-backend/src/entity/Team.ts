import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Match } from "./Match";
import { TeamMatch } from "./TeamMatch";

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
}
