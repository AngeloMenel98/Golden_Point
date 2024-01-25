import { UserRepository } from '../repository';
import { PersonalData, TourCoin, User } from '../entity';
import { PerDataService } from './perDataService';
import { TourCoinService } from './tourCoinService';

export class UserService {
    private perDataService: PerDataService;
    private tourCoinService: TourCoinService;

    constructor() {
        this.perDataService = new PerDataService();
        this.tourCoinService = new TourCoinService();
    }

    async logIn(username: string, password: string): Promise<User> {
        try {
            const existingUser = await UserRepository.findOneBy({
                username: username,
            });
            if (await existingUser.compareHashPass(password)) {
                return existingUser;
            }
        } catch (e) {
            console.error('Error finding user by username', username);
        }
    }

    async create(
        user: User,
        perData: PersonalData,
        tourCoin: TourCoin
    ): Promise<User> {
        const savedUser = await UserRepository.save(user);
        this.perDataService.create(perData, savedUser);
        this.tourCoinService.create(tourCoin, savedUser);

        return savedUser;
    }

    async update(user: User, existingUser: User): Promise<User> {
        try {
            const updatedUser = UserRepository.merge(existingUser, user);

            return await UserRepository.save(updatedUser);
        } catch (error) {
            console.error('Error al actualizar  usuario con ID ${user.id}');
        }
    }

    async delete(user: User): Promise<User> {
        user.isDeleted = true;
        return UserRepository.save(user);
    }

    async findByUsername(username: string): Promise<User> {
        return await UserRepository.findByUsername(username);
    }
    async findById(userId: string): Promise<User> {
        try {
            const existingUser = await UserRepository.findOneBy({
                id: userId,
            });

            if (existingUser) {
                return existingUser;
            } else {
                console.error('Error finding user by ID', userId);
            }
        } catch (err) {
            console.error('Error finding user by ID', userId);
        }
    }
}
