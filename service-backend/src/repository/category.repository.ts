import { AppDataSource } from '../data-source';
import { Category } from '../entity';

export const CategoryRepository = AppDataSource.getRepository(Category).extend(
    {}
);
