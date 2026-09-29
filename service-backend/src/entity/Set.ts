import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Index } from 'typeorm';
import { Match } from './Match';

@Entity()
@Index("IDX_SET_MATCH", ["match"])
export class Set {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('integer')
    setNumber: number;

    @Column('integer')
    gamesTeam1: number;

    @Column('integer')
    gamesTeam2: number;

    @CreateDateColumn({ name: "createdAt" })
    createdAt: Date;

    @ManyToOne(() => Match, (match) => match.sets)
    match: Match;
}
