import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Tournament } from "./Tournament";
import { Team } from "./Team";
import { Set } from "./Set";
import { Court } from "./Court";
import { TeamMatch } from "./TeamMatch";
import { GroupStage } from "./GroupStage";

@Entity()
export class Match {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("float")
  amountTourPoints: number;

  @Column("integer")
  amountTourCoins: number;

  @Column("timestamptz")
  matchDate: string;

  @ManyToOne(() => Tournament, (tournament) => tournament.matches)
  tournament: Tournament;

  @ManyToOne(() => Court, (court) => court.matches)
  court: Court;

  @OneToMany(() => TeamMatch, (teamMatch) => teamMatch.match)
  teamMatches: TeamMatch[];

  @OneToMany(() => Set, (set) => set.match)
  sets: Set[];

  @ManyToOne(() => GroupStage, (groupStage) => groupStage.matches)
  groupStage: GroupStage;
}
