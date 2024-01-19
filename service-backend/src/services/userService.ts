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
    async findById(userId: string): Promise<User | undefined> {
        try {
            const existingUser = await UserRepository.findOneBy({
                id: userId,
            });

            if (existingUser) {
                return existingUser;
            } else {
                console.error('Error finding user by ID', userId);
                return undefined;
            }
        } catch (err) {
            console.error('Error finding user by ID', userId);
            return undefined;
        }
    }
}
