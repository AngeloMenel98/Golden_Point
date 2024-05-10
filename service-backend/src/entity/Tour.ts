import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
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

  @Column()
  tourCode: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToMany(() => User, (user) => user.tours)
  @JoinTable()
  users: User[];

  @OneToMany(() => Tournament, (tournaments) => tournaments.tour)
  tournaments: Tournament[];

  @ManyToMany(() => Club, (club) => club.tours)
  @JoinTable()
  clubs: Club[];
}
