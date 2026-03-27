import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Club } from './Club';

@Entity()
export class CalendarClub {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('timestamptz')
    availableFrom: string;

    @Column('timestamptz')
    availableTo: string;

    @CreateDateColumn({ name: "createdAt" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updatedAt" })
    updatedAt: Date;

    @OneToMany(() => Club, (club) => club.calendarClub)
    clubs: Club[];
}
