import { CategoryService, TourService } from '.';
import { Category, Tournament } from '../entity';
import { ServiceCodeError } from '../errors/errorsClass';
import { TournamentRepository } from '../repository';

export class TournamentService {
    private tourService: TourService;
    private categoryService: CategoryService;

    constructor() {
        this.tourService = new TourService();
        this.categoryService = new CategoryService();
    }

    async create(
        newTournament: Tournament,
        tourId: string,
        categoryData: Category[]
    ) {
        const existingTour = await this.tourService.findById(tourId);

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
