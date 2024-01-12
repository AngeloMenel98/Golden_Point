import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import { Match } from './Match';
import { Club } from './Club';

@Entity()
export class Court {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(() => Match, (match) => match.court)
    matches: Match[];

    @ManyToOne(() => Club, (club) => club.courts)
    club: Club;
}
