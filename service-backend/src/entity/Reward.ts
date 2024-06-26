import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Reward {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('text')
    info: string;

    @Column('integer')
    amountTourCoins: number;

    @ManyToMany(() => User, (user) => user.rewards)
    @JoinTable()
    users: User[];
}
