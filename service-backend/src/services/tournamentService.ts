import { CategoryService, TourService, UserService } from ".";
import codeErrors from "../constants/codeErrors";
import { Category, Tournament } from "../entity";
import { User } from "../entity/User";
import { ServiceCodeError } from "../errors/errorsClass";
import { isNotUserAdmin } from "../helpers/adminValidation";
import { TournamentRepository } from "../repository";

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
