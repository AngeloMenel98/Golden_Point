import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';
import { User } from './User';

@Entity()
@Index("IDX_NOTIFICATION_USER", ["user"])
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
