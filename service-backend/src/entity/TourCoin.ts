import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class TourCoin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('integer')
    coins: number;

    @CreateDateColumn({ name: "createdAt" })
    createdAt: Date;

    @OneToOne(() => User, (user) => user.tourCoin)
    @JoinColumn()
    user: User;
}
