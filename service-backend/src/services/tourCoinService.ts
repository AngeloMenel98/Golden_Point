import { TourCoinRepository } from '../repository';
import { TourCoin } from '../entity';
import { User } from '../entity/User';

export class TourCoinService {
    async create(
        newTourCoin: TourCoin,
        user: User
    ): Promise<TourCoin | undefined> {
        try {
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
