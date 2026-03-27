import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Tournament } from "./Tournament";
import { Club } from "./Club";

@Entity()
export class Tour {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  tourCode: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.tours)
  @JoinTable()
  users: User[];

  @OneToMany(() => Tournament, (tournaments) => tournaments.tour)
  tournaments: Tournament[];

  @ManyToMany(() => Club, (club) => club.tours)
  @JoinTable()
  clubs: Club[];
}
