import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { Match } from './Match';
import { Club } from './Club';

@Entity()
export class Court {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    courtNumber: number;

    @CreateDateColumn({ name: "createdAt" })
    createdAt: Date;

    @OneToMany(() => Match, (match) => match.court)
    matches: Match[];

    @ManyToOne(() => Club, (club) => club.courts)
    club: Club;
}
