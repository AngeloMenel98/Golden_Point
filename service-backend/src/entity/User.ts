import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  OneToMany,
} from "typeorm";
import {
  PersonalData,
  Tour,
  Team,
  TourCoin,
  Notification,
  Reward,
} from "./index";
import { compareHash, hashValue } from "../helpers/bCrypt.helper";
import { IsEnum } from "class-validator";

/**
 * Definimos un enum llamado UserRole, que enumera los roles posibles para un usuario: 
        - ADMIN
        - USER 
 * Estos roles se utilizarán para controlar los permisos y privilegios dentro del sistema. 
*/
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

/**
 * Definimos la entidad User.
 * Columnas:
        - id: se genera automáticamente como un UUID (identificador unico universal).
        - username: nombre de usuario, de tipo string con longitud maxima de 20 caracteres.
        - email: correo electronico del usuario, de tipo string.
        - password: contraseña del usuario, de tipo string.
        - isSingle: estado civil del usuario, de tipo booleano para indicar si esta solterio o no.
        - isDeleted: indica si el usuario esta eliminado o no, de tipo booleano con un valor predeterminado de "false".
        - role: rol/privilegio del usuario, utilizando el enum UserRole previamente definido.

 *  Relaciones:
        - personalData: uno a uno con entidad PersonalData.
        - tourCoin: uno a uno con entidad TourCoin.
        - tours: muchos a muchos con entidad Tour.
        - teams: muchos a muchos con entidad Team.
        - notifications: uno a muchos con entidad Notification.
        - rewards: muchos a muchos con entidad Reward.
 
 * hashPassword: metodo asincrónico para cifrar la contraseña del usuario utilizando una función hash. Devuelve la contraseña cifrada.
 * compareHashPass: metodo para comparar una contraseña en texto plano con la contraseña cifrada almacenada en la base de datos.
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 20 })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isSingle: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({
    type: "enum",
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
