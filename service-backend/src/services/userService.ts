import { UserRepository } from '../repository';
import { PersonalData, TourCoin, User } from '../entity';
import { PerDataService } from './perDataService';
import { TourCoinService } from './tourCoinService';
import { createError } from '../errors/errors';

import { validate } from 'class-validator';
import { AppDataSource } from '../data-source';
import { UserServiceValidationError } from '../errors/errorsClass';

export class UserService {
    private perDataService: PerDataService;
    private tourCoinService: TourCoinService;

    constructor() {
        this.perDataService = new PerDataService();
        this.tourCoinService = new TourCoinService();
    }

    async logIn(username: string, password: string) {
        try {
            const existingUser = await UserRepository.findOneBy({
                username: username,
            });

            if (!existingUser) {
                return { error: createError(404, 'Username does not exist') };
            }

            if (!existingUser.compareHashPass(password)) {
                return { error: createError(404, 'Password is incorrect') };
            }

            return { user: existingUser };
        } catch (e) {
            return {
                error: createError(500, 'Error finding user by username'),
            };
        }
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
        try {
            const updatedUser = UserRepository.merge(existingUser, user);
            this.perDataService.update(perData, updatedUser.id);
            return { user: await UserRepository.save(updatedUser) };
        } catch (e) {
            console.error(e);
            return { error: createError(500, 'Error updating User') };
        }
    }

    async delete(user: User) {
        user.isDeleted = true;
        return { user: await UserRepository.save(user) };
    }

    async findByUsername(username: string) {
        try {
            const user = await UserRepository.findByUsername(username);
            if (!user) {
                return {
                    error: createError(404, 'User does not exist by username'),
                };
            }

            return { user: user };
        } catch (e) {
            console.error(e);
            return { error: createError(500, 'Error in findByUsername') };
        }
    }

    async findById(userId: string) {
        try {
            const existingUser = await UserRepository.findOneBy({
                id: userId,
            });

            if (!existingUser) {
                return { error: createError(404, 'User by ID not Found') };
            }
            return { user: existingUser };
        } catch (e) {
            console.error(e);
            return { error: createError(500, 'Error in findById') };
        }
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
