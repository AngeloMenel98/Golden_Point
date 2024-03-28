import { PerDataRepository } from '../repository';
import { PersonalData, User } from '../entity';

export class PerDataService {
    async create(perData: PersonalData, user: User): Promise<PersonalData> {
        try {
            if (user) {
                perData.user = user;
                return await PerDataRepository.save(perData);
            }
            console.log("Personal Data couldn't be created");
        } catch (e) {
            console.error('Error al crear Personal Data', e);
        }
    }

    async update(perData: PersonalData, userId: string): Promise<PersonalData> {
        try {
            const existingPerData = await PerDataRepository.findByUserId(
                userId
            );

            if (existingPerData) {
                const updatedPerData = PerDataRepository.merge(
                    existingPerData,
                    perData
                );
                console.log(updatedPerData);
                return await PerDataRepository.save(updatedPerData);
            }
        } catch (e) {
            console.error('Error al actualizar PersonalData', e);
        }
    }
}
