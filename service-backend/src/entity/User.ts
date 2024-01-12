import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    ManyToMany,
    OneToMany,
} from 'typeorm';
import { PersonalData } from './index';
import { Tour } from './Tour';
import { Team } from './Team';
import { TourCoin } from './TourCoin';
import { Notification } from './Notification';
import { Reward } from './Reward';

export enum UserRole {
    SUPERADMIN = 'superadmin',
    ADMIN = 'admin',
    USER = 'user',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    isSingle: boolean;

    @OneToOne(() => PersonalData, (personalData) => personalData.user)
    personalData: PersonalData;

    @OneToOne(() => TourCoin, (tourCoin) => tourCoin.user)
    tourCoin: TourCoin;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    @ManyToMany(() => Tour, (tour) => tour.users)
    tours: Tour[];

    @ManyToMany(() => Team, (team) => team.users)
    teams: Team[];

    @OneToMany(() => Notification, (notification) => notification.user)
    notifications: Notification[];

    @ManyToMany(() => Reward, (reward) => reward.users)
    rewards: Reward[];
}
