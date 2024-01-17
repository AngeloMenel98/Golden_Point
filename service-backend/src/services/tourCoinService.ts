import { TourCoinRepository } from '../repository';
import { TourCoin } from '../entity';
import { UserService } from './userService';
import { UserRole } from '../entity/User';

export class TourCoinService {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async create(
        newTourCoin: TourCoin,
        userId: number
    ): Promise<TourCoin | undefined> {
        try {
            const user = await this.userService.findById(userId);
            if (user) {
                newTourCoin.user = user;
                return await TourCoinRepository.save(newTourCoin);
            }
            console.log("TourCoin couldn't be created");
        } catch (err) {
            console.error('Error al crear Tour Coin', err);
        }
    }
}
