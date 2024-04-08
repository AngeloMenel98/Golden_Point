import { TourRepository } from '../repository';
import { Tour } from '../entity';
import { UserService } from '.';
import { UserRole } from '../entity/User';
import { ServiceCodeError, TourServiceError } from '../errors/errorsClass';

export class TourService {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async create(newTour: Tour, userId: string) {
        const user = await this.userService.findById(userId);

        if (user.role != UserRole.ADMIN) {
            throw new TourServiceError('User is not ADMIN', user.id);
        }
        return TourRepository.save({ ...newTour, users: [user] });
    }

    async delete(tour: Tour) {
        tour.isDeleted = true;
        return TourRepository.save(tour);
    }

    async joinUserToTour(userId: string, tourCode: string) {
        const existingTour = await TourRepository.findOneBy({
            tourCode: tourCode,
        });

        if (!existingTour) {
            throw new TourServiceError('TourCode does not exist', tourCode);
        }

        const user = await this.userService.findById(userId);

        return TourRepository.joinUser(user, existingTour);
    }

    async findById(tourId: string) {
        const existingTour = await TourRepository.findOneBy({
            id: tourId,
        });
        if (!existingTour) {
            throw new ServiceCodeError('Tour ID does not exist', 'TourID-1');
        }
        return existingTour;
    }

    async getAll() {
        const tours: unknown[] = await TourRepository.getAll();

        if (tours.length == 0) {
            throw new ServiceCodeError('There is any Tour created', 'TourS-1');
        }
        return tours;
    }
}
