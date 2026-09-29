import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Match } from "./Match";

@Entity()
export class GroupStage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 25 })
  groupStage: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @OneToMany(() => Match, (match) => match.groupStage)
  matches: Match[];
}
