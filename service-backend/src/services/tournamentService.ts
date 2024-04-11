import { CategoryService, TourService, UserService } from '.';
import { Category, Tournament } from '../entity';
import { UserRole } from '../entity/User';
import { ServiceCodeError } from '../errors/errorsClass';
import { TournamentRepository } from '../repository';

export class TournamentService {
    private tourService: TourService;
    private categoryService: CategoryService;
    private userService: UserService;

    constructor() {
        this.tourService = new TourService();
        this.categoryService = new CategoryService();
        this.userService = new UserService();
    }

    async create(
        newTournament: Tournament,
        tourId: string,
        userId: string,
        categoryData: Category[]
    ) {
        const existingTour = await this.tourService.findById(tourId);
        const existingUser = await this.userService.findById(userId);

        if (existingUser.role != UserRole.ADMIN) {
            throw new ServiceCodeError('User is not ADMIN', 'TournS-3');
        }

        const existingCats = await this.categoryService.findCategories(
            categoryData
        );

        const newCategories = await this.categoryService.create(categoryData);
        const combinedCategories = [...existingCats, ...newCategories];

        return TournamentRepository.create(
            newTournament,
            existingTour,
            combinedCategories
        );
    }

    async findById(tournamentId: string) {
        const existingTourn = await TournamentRepository.findOneBy({
            id: tournamentId,
        });

        if (!existingTourn) {
            throw new ServiceCodeError(
                'Tournament ID does not exist',
                'TournS-1'
            );
        }

        return existingTourn;
    }
}
