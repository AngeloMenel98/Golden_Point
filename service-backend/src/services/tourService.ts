import { TourRepository, UserRepository } from "../repository";
import { Tour } from "../entity";
import { UserService } from ".";
import { User } from "../entity/User";
import { ServiceCodeError } from "../errors/errorsClass";
import codeErrors from "../constants/codeErrors";
import { isNotUserAdmin } from "../helpers/adminValidation";

export class TourService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async create(newTour: Tour, userId: string) {
    const user = await this.userService.findById(userId);

    isNotUserAdmin(user);

    return TourRepository.save({ ...newTour, users: [user] });
  }

  async delete(tour: Tour, user: User) {
    isNotUserAdmin(user);
    tour.isDeleted = true;
    return TourRepository.save(tour);
  }

  async joinUserToTour(userId: string, tourCode: string) {
    const existingTour = await TourRepository.findOneBy({
      tourCode: tourCode,
    });

    if (!existingTour) {
      throw new ServiceCodeError(codeErrors.TOUR_1);
    }

    const user = await this.userService.findById(userId);

    const userInTour = await UserRepository.findUserInTour(userId);

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

  async getAll() {
    const tours: unknown[] = await TourRepository.getAll();

    if (tours.length == 0) {
      throw new ServiceCodeError(codeErrors.GEN_2("Tour"));
    }
    return tours;
  }
}
