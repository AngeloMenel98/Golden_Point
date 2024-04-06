import { TourRepository } from '../repository';
import { Tour } from '../entity';
import { UserService } from '.';
import { UserRole } from '../entity/User';

export class TourService {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async create(
        newTour: Tour,
        userId: string
    ): Promise<{ success: boolean; tour?: Tour; message?: string }> {
        try {
            const user = await this.userService.findById(userId);

            if (user && user.user.role == UserRole.ADMIN) {
                newTour.users = [user.user];
                const savedTour = await TourRepository.save(newTour);
                return { success: true, tour: savedTour };
            }
            return {
                success: false,
                message:
                    'The Tour was not created beacuse the user is not SUPERADMIN or the ID does not exist',
            };
        } catch (e) {
            console.error(e);
            return {
                success: false,
                message: 'Error creating a Tour',
            };
        }
    }

    async delete(
        tour: Tour
    ): Promise<{ success: boolean; tour?: Tour; message?: string }> {
        try {
            tour.isDeleted = true;
            const savedTour = await TourRepository.save(tour);
            return { success: true, tour: savedTour };
        } catch (e) {
            console.error(e);
            return {
                success: false,
                message: 'Error eliminating the Tour',
            };
        }
    }

    async joinUserToTour(
        userId: string,
        tourCode: string
    ): Promise<{ success: boolean; tour?: Tour; message?: string }> {
        try {
            const existingTour = await TourRepository.findOneBy({
                tourCode: tourCode,
            });

            const user = await this.userService.findById(userId);
            if (existingTour && user) {
                const usersInTour = await TourRepository.getUsersByTourId(
                    existingTour.id
                );
                existingTour.users = [...usersInTour, user.user];
                const savedTour = await TourRepository.save(existingTour);
                return { success: true, tour: savedTour };
            }
            return { success: false, message: 'Error adding user to Tour' };
        } catch (e) {
            console.error(e);
            return {
                success: false,
                message: 'Error adding User to Tour',
            };
        }
    }

    async findById(
        tourId: string
    ): Promise<{ success: boolean; tour?: Tour; message?: string }> {
        try {
            const existingTour = await TourRepository.findOneBy({
                id: tourId,
            });
            if (existingTour) {
                return { success: true, tour: existingTour };
            }
            return {
                success: false,
                message: 'Tour was not found by ID: ' + tourId,
            };
        } catch (e) {
            console.error(e);
            return {
                success: false,
                message: 'Error founding Tour',
            };
        }
    }

    async getAll(): Promise<{
        success: boolean;
        tours?: Tour[];
        message?: string;
    }> {
        try {
            const existingTours = await TourRepository.getAll();
            return { success: true, tours: existingTours };
        } catch (e) {
            console.error(e);
            return {
                success: false,
                message: 'Error getting all Tours',
            };
        }
    }
}
