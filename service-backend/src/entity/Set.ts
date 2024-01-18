import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Match } from './Match';

@Entity()
export class Set {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('integer')
    gamesTeam1: number;

    @Column('integer')
    gamesTeam2: number;

    @ManyToOne(() => Match, (match) => match.sets)
    match: Match;
}
