import { AppDataSource } from '../data-source';
import { TourCoin } from '../entity';

export const TourCoinRepository = AppDataSource.getRepository(TourCoin).extend(
    {}
);
