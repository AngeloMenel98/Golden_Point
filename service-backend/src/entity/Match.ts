import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  Index,
} from "typeorm";
import { Tournament } from "./Tournament";
import { Team } from "./Team";
import { Set } from "./Set";
import { Court } from "./Court";
import { TeamMatch } from "./TeamMatch";
import { GroupStage } from "./GroupStage";

@Entity()
@Index("IDX_MATCH_TOURNAMENT", ["tournament"])
@Index("IDX_MATCH_COURT", ["court"])
@Index("IDX_MATCH_GROUP_STAGE", ["groupStage"])
export class Match {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("float")
  amountTourPoints: number;

  @Column("integer")
  amountTourCoins: number;

  @Column("timestamptz")
  matchDate: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

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
