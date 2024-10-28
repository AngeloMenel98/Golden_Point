import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { Court } from "./Court";
import { CalendarClub } from "./CalendarClub";
import { Tour } from "./Tour";

@Entity()
export class Club {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 30 })
  clubName: string;

  @Column({ length: 30 })
  location: string;

  @OneToMany(() => Court, (court) => court.club)
  courts: Court[];

  @ManyToOne(() => CalendarClub, (calendarClub) => calendarClub.clubs)
  calendarClub: CalendarClub;

  @ManyToMany(() => Tour, (tour) => tour.clubs)
  tours: Tour[];
}
