import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Match } from './Match';

@Entity()
export class Set {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('integer')
    gamesTeam1: number;

    @Column('integer')
    gamesTeam2: number;

    @ManyToOne(() => Match, (match) => match.sets)
    match: Match;
}
