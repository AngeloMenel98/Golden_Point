import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    OneToMany,
    JoinTable,
} from 'typeorm';
import { User } from './User';
import { Tournament } from './Tournament';
import { Club } from './Club';

@Entity()
export class Tour {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    tourCode: string;

    @ManyToMany(() => User, (user) => user.tours)
    @JoinTable()
    users: User[];

    @OneToMany(() => Tournament, (tournaments) => tournaments.tour)
    tournaments: Tournament[];

    @OneToMany(() => Club, (club) => club.tour)
    clubs: Club[];
}
