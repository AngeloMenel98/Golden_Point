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
    first_name: string;

    @Column({ length: 20 })
    last_name: string;

    @Column('integer')
    phone_number: number;

    @Column({ length: 50 })
    location: string;

    @OneToOne(() => User, (user) => user.personalData)
    @JoinColumn()
    user: User;
}
