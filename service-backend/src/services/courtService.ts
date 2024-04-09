import { CourtRepository } from '../repository';
import { Club, Court } from '../entity';
import { ServiceCodeError } from '../errors/errorsClass';

export class CourtService {
    async findById(courtId: string) {
        const existingCourt = await CourtRepository.findOneBy({
            id: courtId,
        });

        if (!existingCourt) {
            throw new ServiceCodeError('Court ID does not exist', 'CourtS-1');
        }

        return existingCourt;
    }
}
