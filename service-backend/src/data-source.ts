import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  User,
  PersonalData,
  Tour,
  Tournament,
  Category,
  Match,
  Team,
  Set,
  Court,
  Club,
  CalendarClub,
  TourCoin,
  Notification,
  Reward,
  TeamMatch,
<<<<<<< HEAD
=======
  GroupStage,
>>>>>>> develop
} from "./entity/index";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    User,
    PersonalData,
    Tour,
    Tournament,
    Category,
    Match,
    Team,
    Set,
    Court,
    Club,
    CalendarClub,
    TourCoin,
    Notification,
    Reward,
    TeamMatch,
<<<<<<< HEAD
=======
    GroupStage,
>>>>>>> develop
  ],
  migrations: [],
  subscribers: [],
});
