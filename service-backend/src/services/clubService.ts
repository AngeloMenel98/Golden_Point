import { ClubRepository } from "../repository";
import { CalendarClub, Club, Court } from "../entity";
import { UserRole } from "../entity/User";
import { TourService, UserService } from ".";
import { ServiceCodeError } from "../errors/errorsClass";
import codeErrors from "../constants/codeErrors";
import { isNotUserAdmin } from "../helpers/adminValidation";

export class ClubService {
  private tourService: TourService;
  private userService: UserService;

  constructor() {
    this.tourService = new TourService();
    this.userService = new UserService();
  }

  async create(
    newClub: Club,
    newCalClub: CalendarClub,
    userId: string,
    tourId: string,
    courtsNumber: number
  ) {
    const existingTour = await this.tourService.findById(tourId);
    const existingUser = await this.userService.findById(userId);

    isNotUserAdmin(existingUser);

    const newCourts: Court[] = [];
    for (let i = 0; i < courtsNumber; i = i + 1) {
      const newCourt = new Court();
      newCourt.courtNumber = i + 1;

      newCourts.push(newCourt);
    }

    return ClubRepository.create(newClub, existingTour, newCalClub, newCourts);
  }

  async getAll() {
    const existingClubs: unknown[] = await ClubRepository.getAll();

    if (existingClubs.length == 0) {
      throw new ServiceCodeError(codeErrors.GEN_2("Club"));
    }

    return existingClubs;
  }
}
