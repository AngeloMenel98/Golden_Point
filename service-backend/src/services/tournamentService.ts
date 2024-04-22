import { CategoryService, TourService, UserService } from ".";
import codeErrors from "../constants/codeErrors";
import { Category, Tournament } from "../entity";
import { User } from "../entity/User";
import { ServiceCodeError } from "../errors/errorsClass";
import { isNotUserAdmin } from "../helpers/adminValidation";
import {
  ClubRepository,
  TeamRepository,
  TournamentRepository,
} from "../repository";

export class TournamentService {
  private tourService: TourService;
  private categoryService: CategoryService;
  private userService: UserService;

  constructor() {
    this.tourService = new TourService();
    this.categoryService = new CategoryService();
    this.userService = new UserService();
  }

  async create(
    newTournament: Tournament,
    tourId: string,
    userId: string,
    categoryData: Category[]
  ) {
    const existingTour = await this.tourService.findById(tourId);
    const existingUser = await this.userService.findById(userId);

    isNotUserAdmin(existingUser);

    const existingCats = await this.categoryService.findCategories(
      categoryData
    );

    const newCategories = await this.categoryService.create(categoryData);
    const combinedCategories = [...existingCats, ...newCategories];

    return TournamentRepository.create(
      newTournament,
      existingTour,
      combinedCategories
    );
  }

  async delete(tournament: Tournament, user: User) {
    isNotUserAdmin(user);
    tournament.isDeleted = true;
    return TournamentRepository.save(tournament);
  }

  async start(tournament: Tournament, user: User) {
    const clubsWithCat = await ClubRepository.getClubs(tournament.id);
    const teamsWithCat = await TeamRepository.getTeams(tournament.id);
    let clubData: unknown[] = [];
    let teamData: unknown[] = [];

    if (!clubsWithCat || clubsWithCat.length == 0) {
      throw new Error("Error al iniciar el torneo: No se encontraron datos");
    }

    if (!teamsWithCat || teamsWithCat.length == 0) {
      throw new Error("Error al iniciar el torneo: No se encontraron datos");
    }

    isNotUserAdmin(user);

    if (!clubsWithCat || clubsWithCat.length == 0) {
      throw new Error("Error al iniciar el torneo: No se encontraron datos");
    }

    for (const cwc of clubsWithCat) {
      clubData.push({
        clubName: cwc.clubName,
        avFrom: new Date(cwc.availableFrom),
        avTo: new Date(cwc.availableTo),
        ctNumbers: cwc.courtNumbers.split(","),
        categories: cwc.categories.split(","),
      });
    }

    for (const twc of teamsWithCat) {
      teamData.push({
        teamName: twc.teamName,
        category: twc.category,
      });
    }

    return teamData;
  }

  async findById(tournamentId: string) {
    const existingTourn = await TournamentRepository.findOneBy({
      id: tournamentId,
    });

    if (!existingTourn) {
      throw new ServiceCodeError(codeErrors.GEN_1("Tournament"));
    }

    return existingTourn;
  }
}
