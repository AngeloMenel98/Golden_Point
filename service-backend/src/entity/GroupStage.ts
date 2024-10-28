import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Match } from "./Match";

@Entity()
export class GroupStage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 25 })
  groupStage: string;

  @OneToMany(() => Match, (match) => match.groupStage)
  matches: Match[];
}
