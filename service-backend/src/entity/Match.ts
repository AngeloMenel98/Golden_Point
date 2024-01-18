import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    OneToMany,
} from 'typeorm';
import { Tournament } from './Tournament';
import { Team } from './Team';
import { Set } from './Set';
import { Court } from './Court';

@Entity()
export class Match {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('float')
    amountTourPoints: number;

    @Column('integer')
    amountTourCoins: number;

    @Column('timestamptz')
    matchDate: string;

    @ManyToOne(() => Tournament, (tournament) => tournament.matches)
    tournament: Tournament;

    @ManyToOne(() => Court, (court) => court.matches)
    court: Court;

    @ManyToMany(() => Team, (team) => team.matches)
    teams: Team[];

    @OneToMany(() => Set, (set) => set.match)
    sets: Set[];
}
