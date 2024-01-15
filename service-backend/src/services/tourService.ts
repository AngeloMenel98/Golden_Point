import { TourRepository } from '../repository/tour.repository';
import { Tour } from '../entity';

export class TourService {
    async create(tour: Tour): Promise<Tour | undefined> {
        try {
            const existingTour = await TourRepository.findBy({
                tourCode: tour.tourCode,
            });

            if (existingTour.length > 0) {
                console.log('El Tour ya existe con codigo: ', tour.tourCode);
                return undefined;
            }
            return await TourRepository.save(tour);
        } catch (err) {
            console.error('Error al crear el Tour', err);
            return undefined;
        }
    }
}
