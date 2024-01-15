import { TourRepository, UserRepository } from '../repository';
import { Tour } from '../entity';
import { UserService } from './userService';
import { UserRole } from '../entity/User';

export class TourService {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async create(newTour: Tour, userId: number): Promise<Tour | undefined> {
        try {
            const existingTour = await TourRepository.findBy({
                tourCode: newTour.tourCode,
            });
            if (existingTour.length > 0) {
                console.log(
                    'The Tour already exist with code: ',
                    newTour.tourCode
                );
                return undefined;
            }

            const user = await this.userService.findById(userId);

            if (user && user.role == UserRole.SUPERADMIN) {
                newTour.users = [user];
                return await TourRepository.save(newTour);
            }
            console.log('No se creo tour porque el usuario no es SUPERADMIN');
        } catch (err) {
            console.error('Error al crear el Tour', err);
        }
    }

    async joinUserToTour(
        userId: number,
        tourCode: string
    ): Promise<Tour | undefined> {
        try {
            const existingTour = await TourRepository.findOneBy({
                tourCode: tourCode,
            });

            const user = await this.userService.findById(userId);
            if (existingTour && user) {
                const usersInTour = await UserRepository.getUsersByTourId(
                    existingTour.id
                );
                existingTour.users = [...usersInTour, user];
                return TourRepository.save(existingTour);
            }
        } catch (e) {
            console.error('Error al agregar usuario al Tour', e);
        }
    }
}
