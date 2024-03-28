import { AppDataSource } from '../data-source';
import { PersonalData } from '../entity';

export const PerDataRepository = AppDataSource.getRepository(
    PersonalData
).extend({
    async findByUserId(userId: string): Promise<PersonalData> {
        return await this.findOne({ where: { user: { id: userId } } });
    },
});
