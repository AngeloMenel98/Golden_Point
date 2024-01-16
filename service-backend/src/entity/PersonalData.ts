import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class PersonalData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    firstName: string;

    @Column({ length: 20 })
    lastName: string;

    @Column('integer')
    phoneNumber: number;

    @Column({ length: 50 })
    location: string;

    @OneToOne(() => User, (user) => user.personalData)
    @JoinColumn()
    user: User;
}
