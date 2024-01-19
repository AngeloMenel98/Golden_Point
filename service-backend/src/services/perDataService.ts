import { PerDataRepository } from '../repository';
import { PersonalData, User } from '../entity';

export class PerDataService {
    async create(
        perData: PersonalData,
        user: User
    ): Promise<PersonalData | undefined> {
        try {
            if (user) {
                perData.user = user;
                return await PerDataRepository.save(perData);
            }
            console.log("Personal Data couldn't be created");
        } catch (err) {
            console.error('Error al crear Personal Data', err);
        }
    }
}
