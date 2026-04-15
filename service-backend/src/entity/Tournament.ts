import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  Index,
} from "typeorm";
import { Tour } from "./Tour";
import { Category } from "./Category";
import { Match } from "./Match";
import { Team } from "./Team";
import { IsEnum } from "class-validator";

export enum Status {
  FINISH = "finish",
  IN_PROGRESS = "inProgress",
  PENDING = "pending",
}

@Entity()
@Index("IDX_TOURNAMENT_STATUS_DELETED", ["status", "isDeleted"])
export class Tournament {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column("integer")
  master: number;

  @Column()
  isDeleted: boolean;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @Column({
    type: "enum",
    enum: Status,
  })
  @IsEnum(Status)
  status: Status;

  @ManyToOne(() => Tour, (tour) => tour.tournaments)
  tour: Tour;

  @ManyToMany(() => Category, (category) => category.tournaments)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Match, (match) => match.tournament)
  matches: Match[];

  @OneToMany(() => Team, (team) => team.tournament)
  teams: Team[];
}
