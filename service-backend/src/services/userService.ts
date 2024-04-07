import { PerDataRepository, UserRepository } from '../repository';
import { PersonalData, TourCoin, User } from '../entity';
import { PerDataService } from './perDataService';
import { TourCoinService } from './tourCoinService';
import { createError } from '../errors/errors';

import { validate } from 'class-validator';
import {
    CustomError,
    UserServiceLogInError,
    UserServiceValidationError,
} from '../errors/errorsClass';

export class UserService {
    constructor() {}

    async logIn(username: string, password: string) {
        const existingUser = await UserRepository.findOneBy({
            username: username,
        });

        if (!existingUser) {
            throw new UserServiceLogInError(
                'User does not exist',
                existingUser.id
            );
        }

        if (!existingUser.compareHashPass(password)) {
            throw new UserServiceLogInError(
                'Password is incorrect',
                existingUser.id
            );
        }

        return existingUser;
    }

    async create(user: User, perData: PersonalData, tourCoin: TourCoin) {
        const userErrors = await validate(user);
        const perErrors = await validate(perData);

        if (userErrors.length > 0 || perErrors.length > 0) {
            // TODO: can be done better (identify if user or personal data error, better message, etc)
            throw new UserServiceValidationError(
                'Validation error',
                perErrors.concat(perErrors)
            );
        }

        return UserRepository.create(user, perData, tourCoin);
    }

    async update(user: User, existingUser: User, perData: PersonalData) {
        const userErrors = await validate(user);
        const perErrors = await validate(perData);

        if (userErrors.length > 0 || perErrors.length > 0) {
            // TODO: can be done better (identify if user or personal data error, better message, etc)
            throw new UserServiceValidationError(
                'Validation error',
                perErrors.concat(perErrors)
            );
        }

        const existingPerData = await PerDataRepository.findByUserId(
            existingUser.id
        );

        return UserRepository.update(
            existingUser,
            existingPerData,
            user,
            perData
        );
    }

    async delete(user: User) {
        user.isDeleted = true;
        return UserRepository.save(user);
    }

    async findByUsername(username: string) {
        const user = await UserRepository.findByUsername(username);

        if (!user) {
            throw new UserServiceLogInError('User Id does not exist', user.id);
        }

        return user;
    }

    async findById(userId: string) {
        const existingUser = await UserRepository.findOneBy({
            id: userId,
        });

        if (!existingUser) {
            throw new UserServiceLogInError(
                'User Id does not exist',
                existingUser.id
            );
        }
        return existingUser;
    }

    async findByIdWithPersonalData(
        userId: string
    ): Promise<{ user: User; personalData: PersonalData }> {
        try {
            const userData = await UserRepository.findUserWithPerData(userId);

            if (userData) {
                return userData;
            } else {
                console.error('Error finding user by ID', userId);
            }
        } catch (err) {
            console.error('Error finding user by ID', userId);
        }
    }
}
