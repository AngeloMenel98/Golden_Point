import { TourRepository, UserRepository } from '../repository';
import { Tour } from '../entity';
import { UserService } from './userService';
import { UserRole } from '../entity/User';

export class TourService {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async create(newTour: Tour, userId: string): Promise<Tour | undefined> {
        try {
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
        userId: string,
        tourCode: string
    ): Promise<Tour | undefined> {
        try {
            const existingTour = await TourRepository.findOneBy({
                tourCode: tourCode,
            });

            const user = await this.userService.findById(userId);
            if (existingTour && user) {
                const usersInTour = await TourRepository.getUsersByTourId(
                    existingTour.id
                );
                existingTour.users = [...usersInTour, user];
                return TourRepository.save(existingTour);
            }
        } catch (e) {
            console.error('Error al agregar usuario al Tour', e);
        }
    }

    async findById(tourId: string): Promise<Tour | undefined> {
        try {
            const existingTour = await TourRepository.findOneBy({
                id: tourId,
            });
            if (existingTour) {
                return existingTour;
            } else {
                console.error('No se encontró un tour con ID', existingTour.id);
            }
        } catch (err) {
            console.error('Error al actualizar  usuario');
            return undefined;
        }
    }
}
