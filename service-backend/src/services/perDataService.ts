import { PerDataRepository } from '../repository/perData.repository';
import { PersonalData } from '../entity';

export class PerDataService {
    async create(perData: PersonalData): Promise<PersonalData | undefined> {
        try {
            return await PerDataRepository.save(perData);
        } catch (err) {
            console.error('Error al crear el Tour', err);
            return undefined;
        }
    }
}
