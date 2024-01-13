import { UserRepository } from '../repository/user.repository';
import { User } from '../entity';

export class UserService {
    async register(user: User): Promise<User> {
        return await UserRepository.save(user);
    }
    async findByUsername(username: string): Promise<User | undefined> {
        return await UserRepository.findByUsername(username);
    }
}
