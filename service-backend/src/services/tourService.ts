import { TourRepository, UserRepository } from "../repository";
import { Club, Tour } from "../entity";
import { User } from "../entity/User";
import { ServiceCodeError } from "../errors/errorsClass";
import codeErrors from "../constants/codeErrors";

export class TourService {
  constructor() {}

  async create(newTour: Tour, user: User, clubs: Club[]) {
    return TourRepository.create(newTour, user, clubs);
  }

  async delete(tour: Tour) {
    tour.isDeleted = true;
    return TourRepository.save(tour);
  }

  async joinUserToTour(user: User, tourCode: string) {
    const existingTour = await TourRepository.findOneBy({
      tourCode: tourCode,
    });

    if (!existingTour) {
      throw new ServiceCodeError(codeErrors.TOUR_1);
    }

    const userInTour = await UserRepository.findUserInTour(user.id, tourCode);

    if (userInTour) {
      throw new ServiceCodeError(codeErrors.TOUR_2(user.username));
    }

    return TourRepository.joinUser(user, existingTour);
  }

  async findById(tourId: string) {
    const existingTour = await TourRepository.findOneBy({
      id: tourId,
    });
    if (!existingTour) {
      throw new ServiceCodeError(codeErrors.GEN_1("Tour"));
    }
    return existingTour;
  }

  async getAll(userId: string) {
    const tours: unknown[] = await TourRepository.getAll(userId);

    if (tours.length == 0) {
      throw new ServiceCodeError(codeErrors.GEN_2("Tour"));
    }
    return tours;
  }
}
