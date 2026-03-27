import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    viewed: boolean;

    @CreateDateColumn({ name: "createdAt" })
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.notifications)
    user: User;
}
