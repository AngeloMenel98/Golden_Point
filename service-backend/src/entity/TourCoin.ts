import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class TourCoin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('integer')
    coins: number;

    @OneToOne(() => User, (user) => user.tourCoin)
    @JoinColumn()
    user: User;
}
