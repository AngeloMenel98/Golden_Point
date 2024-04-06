import { TourCoinRepository } from '../repository';
import { TourCoin } from '../entity';
import { User } from '../entity/User';
import { createError } from '../errors/errors';

export class TourCoinService {
    async create(newTourCoin: TourCoin, user: User) {
        try {
            newTourCoin.user = user;
            return await TourCoinRepository.save(newTourCoin);
        } catch (err) {
            console.error('Error al crear Tour Coin', err);
            return {
                error: createError(500, 'Error creating TourCoin'),
            };
        }
    }
}
