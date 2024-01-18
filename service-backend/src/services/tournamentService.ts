import { TourService } from '.';
import { Tournament } from '../entity';
import { TournamentRepository } from '../repository';

export class TournamentService {
    private tourService: TourService;

    constructor() {
        this.tourService = new TourService();
    }

    async create(
        tournament: Tournament,
        tourId: string
    ): Promise<Tournament | undefined> {
        try {
            const existingTour = await this.tourService.findById(tourId);
            if (existingTour) {
                tournament.tour = existingTour;
                return await TournamentRepository.save(tournament);
            }
            console.error('Tournament not created');
        } catch (e) {
            console.error('Error al crear el Tour', e);
        }
    }
}
