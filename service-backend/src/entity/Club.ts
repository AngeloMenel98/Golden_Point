import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";
import { Court } from "./Court";
import { CalendarClub } from "./CalendarClub";
import { Tour } from "./Tour";
import { User } from "./User";

@Entity()
export class Club {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 30 })
  clubName: string;

  @Column({ length: 30 })
  location: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;

  @Index()
  @ManyToOne(() => User, (user) => user.createdClubs)
  createdBy: User;

  @OneToMany(() => Court, (court) => court.club)
  courts: Court[];

  @ManyToOne(() => CalendarClub, (calendarClub) => calendarClub.clubs)
  calendarClub: CalendarClub;

  @ManyToMany(() => Tour, (tour) => tour.clubs)
  tours: Tour[];
}
