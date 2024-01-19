import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Club } from './Club';

@Entity()
export class CalendarClub {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('timestamptz')
    availableFrom: string;

    @Column('timestamptz')
    availableTo: string;

    @OneToMany(() => Club, (club) => club.calendarClub)
    clubs: Club[];
}
