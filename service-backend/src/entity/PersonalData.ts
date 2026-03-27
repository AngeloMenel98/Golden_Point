import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { IsMobilePhone } from "class-validator";
import { User } from "./User";

@Entity()
export class PersonalData {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 20 })
  firstName: string;

  @Column({ length: 20 })
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column({ length: 50 })
  location: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @OneToOne(() => User, (user) => user.personalData)
  @JoinColumn()
  user: User;
}
