import { ClubRepository } from "../repository";
import { CalendarClub, Club, Court } from "../entity";
import { TourService } from ".";
import { ServiceCodeError } from "../errors/errorsClass";
import codeErrors from "../constants/codeErrors";

export class ClubService {
  private tourService: TourService;

  constructor() {
    this.tourService = new TourService();
  }

  async create(newClub: Club, newCalClub: CalendarClub, courtsNumber: number) {
    const newCourts: Court[] = [];
    for (let i = 0; i < courtsNumber; i = i + 1) {
      const newCourt = new Court();
      newCourt.courtNumber = i + 1;

      newCourts.push(newCourt);
    }

    return ClubRepository.create(newClub, newCalClub, newCourts);
  }

  async getAll(userId: string) {
    const existingClubs: unknown[] = await ClubRepository.getAll(userId);

    if (existingClubs.length == 0) {
      throw new ServiceCodeError(codeErrors.GEN_2("Club"));
    }

    return existingClubs;
  }

  async findById(clubId: string) {
    const existingClub = await ClubRepository.findOneBy({
      id: clubId,
    });
    if (!existingClub) {
      throw new ServiceCodeError(codeErrors.GEN_1("Club"));
    }
    return existingClub;
  }

  async getClubsPerTour(userId: string, tourId: string) {
    const existingClubs: unknown[] = await ClubRepository.getClubsPerTour(
      userId,
      tourId
    );

    if (existingClubs.length == 0) {
      throw new ServiceCodeError(codeErrors.GEN_2("Club"));
    }

    return existingClubs;
  }
}
