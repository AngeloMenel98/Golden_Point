import { PerDataRepository, UserRepository } from '../repository';
import { PersonalData, TourCoin, User } from '../entity';

import { validate } from 'class-validator';
import {
    UserServiceError,
    ServiceValidationError,
} from '../errors/errorsClass';

export class UserService {
    constructor() {}

    async logIn(username: string, password: string) {
        const existingUser = await UserRepository.findOneBy({
            username: username,
        });

        if (!existingUser) {
            throw new UserServiceError('User does not exist', existingUser.id);
        }

        if (!existingUser.compareHashPass(password)) {
            throw new UserServiceError(
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
            throw new ServiceValidationError(
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
            throw new ServiceValidationError(
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
            throw new UserServiceError('User Id does not exist', user.id);
        }

        return user;
    }

    async findById(userId: string) {
        const existingUser = await UserRepository.findOneBy({
            id: userId,
        });

        if (!existingUser) {
            throw new UserServiceError(
                'User ID does not exist',
                existingUser.id
            );
        }
        return existingUser;
    }

    async findByIdWithPersonalData(userId: string) {
        const userData = await UserRepository.findUserWithPerData(userId);

        const user = {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            password: userData.password,
            isSingle: userData.isSingle,
            isDeleted: userData.isDeleted,
            role: userData.role,
        };

        if (userData) {
            return { user: user, perData: userData.personalData };
        } else {
            console.error('Error finding user by ID', userId);
        }
    }
}
