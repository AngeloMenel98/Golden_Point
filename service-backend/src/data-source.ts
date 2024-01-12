import 'reflect-metadata';
import { DataSource } from 'typeorm';
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
} from './entity/index';
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'padel_app',
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
    ],
    migrations: [],
    subscribers: [],
});
