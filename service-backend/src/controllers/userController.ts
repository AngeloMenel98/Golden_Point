import { PersonalData, TourCoin, User } from '../entity';
import { UserService } from '../services';
import { validate } from 'class-validator';
import { UserRole } from '../entity/User';
import * as jwt from 'jsonwebtoken';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }
    async logIn(username: string, password: string) {
        try {
            const resp = await this.userService.logIn(username, password);

            if (resp.error) {
                return {
                    response: { error: resp.error.message },
                    status: resp.error.status,
                };
            }

            const response = {
                id: resp.user.id,
                username: resp.user.username,
                email: resp.user.email,
                isSingle: resp.user.isSingle,
            };

            const secretKey = process.env.JWT_SECRET_KEY;
            const token = jwt.sign(response, secretKey);

            return { response: { token }, status: 201 };
        } catch (e) {
            console.error(e);
            return {
                response: { error: 'Error loggin in' },
                status: 500,
            };
        }
    }

    async create(
        username: string,
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        location: string,
        phoneNumber: string
    ) {
        try {
            const newUser = new User();
            newUser.username = username;
            newUser.email = email;
            newUser.hashPassword(password);
            newUser.isSingle = true;
            newUser.role = UserRole.USER;

            const newPerData = new PersonalData();
            newPerData.firstName = firstName;
            newPerData.lastName = lastName;
            newPerData.location = location;
            newPerData.phoneNumber = phoneNumber;

            const newTourCoin = new TourCoin();
            newTourCoin.coins = 0;

            const userErrors = await validate(newUser);
            const perErrors = await validate(newPerData);

            if (userErrors.length > 0 || perErrors.length > 0) {
                console.log(
                    'Validation failed. Errors:',
                    userErrors,
                    perErrors
                );
                return { response: { error: 'Validation error' }, status: 400 };
            }
            const resp = await this.userService.create(
                newUser,
                newPerData,
                newTourCoin
            );

            if (resp.error) {
                return {
                    response: { error: resp.error.message },
                    status: resp.error.status,
                };
            }
            const response = {
                id: resp.user.id,
                username: resp.user.username,
                email: resp.user.email,
                isSingle: resp.user.isSingle,
            };

            return { response, status: 201 };
        } catch (e) {
            console.error(e);
            return {
                response: { error: 'Error creating new User' },
                status: 500,
            };
        }
    }

    async update(
        userId: string,
        password: string,
        isSingle: boolean,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        location: string
    ) {
        try {
            const resp = await this.userService.findById(userId);

            if (resp.error) {
                return {
                    response: { error: resp.error.message },
                    status: resp.error.status,
                };
            }

            if (resp.user) {
                const updatedUser = new User();
                updatedUser.username = resp.user.username;
                updatedUser.email = resp.user.email;
                updatedUser.hashPassword(password);
                updatedUser.isSingle = isSingle;
                updatedUser.role = UserRole.USER;

                const updatedPerData = new PersonalData();
                updatedPerData.firstName = firstName;
                updatedPerData.lastName = lastName;
                updatedPerData.phoneNumber = phoneNumber;
                updatedPerData.location = location;
                updatedPerData.user = resp.user;

                const userErrors = await validate(updatedUser);
                const perDataErrors = await validate(updatedPerData);

                if (userErrors.length > 0 || perDataErrors.length > 0) {
                    console.log(
                        'Validation failed. Errors:',
                        userErrors,
                        perDataErrors
                    );
                    return {
                        response: { error: 'Validation error' },
                        status: 400,
                    };
                }

                const resUser = await this.userService.update(
                    updatedUser,
                    resp.user,
                    updatedPerData
                );

                if (resUser.error) {
                    return {
                        response: { error: resp.error.message },
                        status: resp.error.status,
                    };
                }

                const response = {
                    id: resUser.user.id,
                    username: resUser.user.username,
                    email: resUser.user.email,
                    isSingle: resUser.user.isSingle,
                };
                return { response, status: 201 };
            }
            return {
                response: { error: 'User not Found' },
                status: 404,
            };
        } catch (e) {
            console.error(e);
            return {
                response: { error: 'Error updating User' },
                status: 500,
            };
        }
    }

    async delete(userId: string) {
        try {
            let resp = await this.userService.findById(userId);

            if (resp.error) {
            }

            resp = await this.userService.delete(resp.user);
            const response = {
                id: resp.user.id,
                username: resp.user.username,
                email: resp.user.email,
                isSingle: resp.user.isSingle,
            };
            return { response, status: 201 };
        } catch (e) {
            console.error(e);
            return {
                response: { error: 'Error deleting User' },
                status: 500,
            };
        }
    }

    async findByUsername(username: string) {
        try {
            const resp = await this.userService.findByUsername(username);

            if (resp.error) {
                return {
                    response: { error: resp.error.message },
                    status: resp.error.status,
                };
            }

            const response = {
                id: resp.user.id,
                username: resp.user.username,
                email: resp.user.email,
                isSingle: resp.user.isSingle,
            };
            return { response, status: 201 };
        } catch (e) {
            console.error(e);
            return {
                response: { error: 'Error finding User by username' },
                status: 500,
            };
        }
    }
}

export default new UserController();
