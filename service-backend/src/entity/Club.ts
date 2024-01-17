import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import { Court } from './Court';
import { CalendarClub } from './CalendarClub';
import { Tour } from './Tour';

@Entity()
export class Club {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30 })
    clubName: string;

    @Column({ length: 30 })
    location: string;

    @OneToMany(() => Court, (court) => court.club)
    courts: Court[];

    @ManyToOne(() => CalendarClub, (calendarClub) => calendarClub.clubs)
    calendarClub: CalendarClub;

    @ManyToOne(() => Tour, (tour) => tour.clubs)
    tour: Tour;
}
