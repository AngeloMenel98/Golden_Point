import { CategoryService, TourService } from '.';
import { Category, Tournament } from '../entity';
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
        newCategories: Category[],
        tourId: string,
        categoryData: { categoryName: string; gender: string }[]
    ): Promise<Tournament> {
        try {
            const existingTour = await this.tourService.findById(tourId);
            if (existingTour.success) {
                newTournament.tour = existingTour.tour;

                const existingCats = await this.categoryService.findCategories(
                    categoryData
                );
                console.log('ExistingCats:', existingCats);
                console.log('CategoryData:', categoryData);
                const savedCategories = await this.categoryService.create(
                    newCategories,
                    categoryData
                );

                const combinedCategories = [
                    ...existingCats,
                    ...savedCategories,
                ];

                console.log('CombinedCat:', combinedCategories);
                newTournament.categories = combinedCategories;

                return TournamentRepository.save(newTournament);
            }
        } catch (e) {
            console.error('Error creating Tournament', e);
        }
    }

    async findById(tournamentId: string) {
        try {
            const existingTourn = await TournamentRepository.findOneBy({
                id: tournamentId,
            });

            if (existingTourn) {
                return existingTourn;
            } else {
                console.error('Error finding user by ID', tournamentId);
            }
        } catch (err) {
            console.error('Error finding user by ID', tournamentId);
        }
    }
}
