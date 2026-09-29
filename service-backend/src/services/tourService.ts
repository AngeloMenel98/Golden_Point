import { TourRepository, UserRepository } from "../repository";
import { Club, Tour } from "../entity";
import { User } from "../entity/User";
import { notFound, conflict, validationError } from "../types/error/app-error";

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
      throw notFound("Tour", tourCode);
    }

    const userInTour = await UserRepository.findUserInTour(user.id, tourCode);

    if (userInTour) {
      throw conflict(`${user.username} ya esta unido al Tour`, "Tour");
    }

    return TourRepository.joinUser(user, existingTour);
  }

  async findById(tourId: string) {
    const existingTour = await TourRepository.findOneBy({
      id: tourId,
    });
    if (!existingTour) {
      throw notFound("Tour", tourId);
    }
    return existingTour;
  }

  async getAll(userId: string) {
    const tours: unknown[] = await TourRepository.getAll(userId);

    if (tours.length == 0) {
      throw conflict("No se encontro ningún Tour", "Tour");
    }
    return tours;
  }
}
