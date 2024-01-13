import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    ManyToMany,
    OneToMany,
} from 'typeorm';
import {
    PersonalData,
    Tour,
    Team,
    TourCoin,
    Notification,
    Reward,
} from './index';
import { hashValue } from '../helpers/bCrypt.helper';

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

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    @OneToOne(() => PersonalData, (personalData) => personalData.user)
    personalData: PersonalData;

    @OneToOne(() => TourCoin, (tourCoin) => tourCoin.user)
    tourCoin: TourCoin;

    @ManyToMany(() => Tour, (tour) => tour.users)
    tours: Tour[];

    @ManyToMany(() => Team, (team) => team.users)
    teams: Team[];

    @OneToMany(() => Notification, (notification) => notification.user)
    notifications: Notification[];

    @ManyToMany(() => Reward, (reward) => reward.users)
    rewards: Reward[];

    async hashPassword(password: string): Promise<string> {
        return (this.password = hashValue(password));
    }
}
