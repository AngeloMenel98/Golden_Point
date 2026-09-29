import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    CreateDateColumn,
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

    @CreateDateColumn({ name: "createdAt" })
    createdAt: Date;

    @ManyToMany(() => User, (user) => user.rewards)
    @JoinTable()
    users: User[];
}
