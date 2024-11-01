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
<<<<<<< HEAD
    const newCourts: Court[] = [];
    for (let i = 0; i < courtsNumber; i = i + 1) {
      const newCourt = new Court();
      newCourt.courtNumber = i + 1;

      newCourts.push(newCourt);
    }

    return ClubRepository.create(newClub, newCalClub, newCourts);
  }

  async getAll() {
    const existingClubs: unknown[] = await ClubRepository.getAll();

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
=======
    const avFrom = new Date(newCalClub.availableFrom);
    const avTo = new Date(newCalClub.availableTo);
    if (courtsNumber <= 0) {
      throw new ServiceCodeError(codeErrors.CLUB_1);
    }

    if (avFrom >= avTo) {
      throw new ServiceCodeError(
        codeErrors.CLUB_2("fecha de inicio", "anterior", "fecha final")
      );
    }

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

  async updateClub(
    clubId: string,
    clubName: string,
    location: string,
    avFrom: string,
    avTo: string
  ) {
    const club = await ClubRepository.updateClub(
      clubId,
      clubName,
      location,
      avFrom,
      avTo
    );

    if (!club) {
      throw new ServiceCodeError(codeErrors.GEN_2("Club"));
    }

    return club;
  }
>>>>>>> develop
}
