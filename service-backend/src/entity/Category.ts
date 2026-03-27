import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn } from "typeorm";
import { Tournament } from "./Tournament";

@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  gender: string;

  @Column()
  category: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @ManyToMany(() => Tournament, (tournament) => tournament.categories)
  tournaments: Tournament[];
}
