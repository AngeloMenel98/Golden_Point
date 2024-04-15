import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    OneToMany,
} from 'typeorm';
import { Tour } from './Tour';
import { Category } from './Category';
import { Match } from './Match';

@Entity()
export class Tournament {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('integer')
    master: number;

    @Column()
    isDeleted: boolean;

    @ManyToOne(() => Tour, (tour) => tour.tournaments)
    tour: Tour;

    @ManyToMany(() => Category, (category) => category.tournaments)
    @JoinTable()
    categories: Category[];

    @OneToMany(() => Match, (match) => match.tournament)
    matches: Match[];
}
