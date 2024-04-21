import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { Match } from "./Match";

@Entity()
export class Team {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  teamName: string;

  @ManyToMany(() => User, (user) => user.teams)
  @JoinTable()
  users: User[];

  @ManyToMany(() => Match, (match) => match.teams)
  @JoinTable()
  matches: Match[];
}
