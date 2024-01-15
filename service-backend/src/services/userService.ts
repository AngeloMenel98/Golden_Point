import { UserRepository } from '../repository/user.repository';
import { User } from '../entity';

export class UserService {
    async register(user: User): Promise<User> {
        return await UserRepository.save(user);
    }
    async updateUser(
        user: User,
        existingUser: User
    ): Promise<User | undefined> {
        try {
            const updatedUser = UserRepository.merge(existingUser, user);

            return await UserRepository.save(updatedUser);
        } catch (error) {
            console.error('Error al actualizar  usuario con ID ${user.id}');
            return undefined;
        }
    }
    async findByUsername(username: string): Promise<User | undefined> {
        return await UserRepository.findByUsername(username);
    }
    async findById(userId: number): Promise<User | undefined> {
        try {
            const existingUser = await UserRepository.findOneBy({
                id: userId,
            });

            if (existingUser) {
                return existingUser;
            } else {
                console.error('No se encontró un usuario con ID ${user.id}');
                return undefined;
            }
        } catch (err) {
            console.error('Error al actualizar  usuario con ID ${user.id}');
            return undefined;
        }
    }
}
