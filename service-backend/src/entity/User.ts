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
import { compareHash, hashValue } from '../helpers/bCrypt.helper';
import { IsBoolean, IsEmail, IsEnum, isBoolean } from 'class-validator';

export enum UserRole {
    SUPERADMIN = 'superadmin',
    ADMIN = 'admin',
    USER = 'user',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 20 })
    username: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column()
    @IsBoolean()
    isSingle: boolean;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({
        type: 'enum',
        enum: UserRole,
    })
    @IsEnum(UserRole)
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

    compareHashPass(password: string) {
        return compareHash(password, this.password);
    }
}
