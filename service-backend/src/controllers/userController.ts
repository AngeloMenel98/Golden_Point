import { Request, Response } from 'express';
import { User } from '../entity';
import { UserService } from '../services/userService';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async save(req: Request, res: Response) {
        try {
            const { username, password, email, isSingle } = req.body;

            const newUser = new User();
            newUser.username = username;
            newUser.email = email;
            newUser.hashPassword(password);
            newUser.isSingle = isSingle;

            const savedUser = await this.userService.register(newUser);

            return res.status(201).json(savedUser);
        } catch (error) {
            console.error('Error al guardar el usuario:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async findByUsername(req: Request, res: Response) {
        try {
            const { username } = req.params;
            const user = await this.userService.findByUsername(username);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            console.error(
                'Error al buscar el usuario por nombre de usuario:',
                error
            );
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async update(req: Request, res: Response) {
        try {
            const { username, password, email, isSingle, userId } = req.body;

            const newUser = new User();
            newUser.username = username;
            newUser.email = email;
            newUser.hashPassword(password);
            newUser.isSingle = isSingle;

            const user = await this.userService.findById(userId);

            if (user) {
                const updatedUser = await this.userService.updateUser(
                    newUser,
                    user
                );
                return res.status(201).json(updatedUser);
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            console.error(
                'Error al actualizar el usuario por nombre de usuario:',
                err
            );
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new UserController();
