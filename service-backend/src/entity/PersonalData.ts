import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
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

  @OneToOne(() => User, (user) => user.personalData)
  @JoinColumn()
  user: User;
}
