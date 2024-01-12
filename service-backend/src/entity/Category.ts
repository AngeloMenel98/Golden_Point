import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Tournament } from './Tournament';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gender: string;

    @Column()
    categoryName: string;

    @ManyToMany(() => Tournament, (tournament) => tournament.categories)
    tournaments: Tournament[];
}
