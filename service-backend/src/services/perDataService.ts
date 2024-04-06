import { PerDataRepository } from '../repository';
import { PersonalData, User } from '../entity';
import { createError } from '../errors/errors';

export class PerDataService {
    async create(perData: PersonalData, user: User) {
        await PerDataRepository.save({ ...perData, user });
    }

    async update(perData: PersonalData, userId: string) {
        try {
            const existingPerData = await PerDataRepository.findByUserId(
                userId
            );

            if (existingPerData) {
                let updatedPerData = PerDataRepository.merge(
                    existingPerData,
                    perData
                );
                return {
                    perData: await PerDataRepository.save(updatedPerData),
                };
            }
        } catch (e) {
            return {
                error: createError(500, 'Error creating Personal Data'),
            };
        }
    }
}
