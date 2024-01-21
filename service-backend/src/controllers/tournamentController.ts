import { Category, Tournament } from '../entity';
import { TournamentService } from '../services';

export class TournamentController {
    private tournService: TournamentService;

    constructor() {
        this.tournService = new TournamentService();
    }

    async create(
        tourId: string,
        title: string,
        master: number,
        categoryData: { categoryName: string; gender: string }[]
    ) {
        try {
            const newTourn = new Tournament();
            newTourn.title = title;
            newTourn.master = master;

            const newCategories: Category[] = [];

            const resp = await this.tournService.create(
                newTourn,
                newCategories,
                tourId,
                categoryData
            );
            return { resp, status: 201 };
        } catch (e) {
            console.error(e);
            return {
                response: { error: 'Error creating new Tournament' },
                status: 500,
            };
        }
    }
}

export default new TournamentController();
