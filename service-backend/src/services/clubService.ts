import { ClubRepository } from "../repository";
import { CalendarClub, Club, Court } from "../entity";
import { TourService } from ".";
import { notFound, conflict, validationError } from "../types/error/app-error";

export class ClubService {
  private tourService: TourService;

  constructor() {
    this.tourService = new TourService();
  }

  async create(newClub: Club, newCalClub: CalendarClub, courtsNumber: number) {
    const avFrom = new Date(newCalClub.availableFrom);
    const avTo = new Date(newCalClub.availableTo);
    if (courtsNumber <= 0) {
      throw validationError("Debe haber al menos una cancha disponible");
    }

    if (avFrom >= avTo) {
      throw validationError("La fecha de inicio debe ser anterior a la fecha final");
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
      throw conflict("No se encontro ningún Club", "Club");
    }

    return existingClubs;
  }

  async findById(clubId: string) {
    const existingClub = await ClubRepository.findOneBy({
      id: clubId,
    });
    if (!existingClub) {
      throw notFound("Club", clubId);
    }
    return existingClub;
  }

  async getClubsPerTour(userId: string, tourId: string) {
    const existingClubs: unknown[] = await ClubRepository.getClubsPerTour(
      userId,
      tourId
    );

    if (existingClubs.length == 0) {
      throw conflict("No se encontro ningún Club", "Club");
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
      throw conflict("No se encontro ningún Club", "Club");
    }

    return club;
  }
}
