import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Club } from './Club';

@Entity()
export class CalendarClub {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('time without time zone')
    hsAvailableFrom: string;

    @Column('time without time zone')
    hsAvailableTo: string;

    @Column('date')
    dayAvailable: string;

    @OneToMany(() => Club, (club) => club.calendarClub)
    clubs: Club[];
}
