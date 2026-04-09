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
  GroupStage,
} from "./entity/index";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // WARNING: synchronize: true automatically syncs schema changes - DO NOT use in production!
  // It can cause data loss and security issues. Use migrations instead for production.
  synchronize: true,
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

    GroupStage,
  ],
  migrations: [],
  subscribers: [],
});
