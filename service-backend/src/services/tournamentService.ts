import { CategoryService, MatchService, TourService } from ".";
import codeErrors from "../constants/codeErrors";
import { Category, Tour, Tournament } from "../entity";
import { User } from "../entity/User";
import { ServiceCodeError } from "../errors/errorsClass";
import {
  ClubRepository,
  TeamRepository,
  TournamentRepository,
} from "../repository";

export class TournamentService {
  private tourService: TourService;
  private categoryService: CategoryService;
  private matchService: MatchService;

  constructor() {
    this.tourService = new TourService();
    this.categoryService = new CategoryService();
    this.matchService = new MatchService();
  }

  async create(
    newTournament: Tournament,
    tourId: string,
    categoryData: Category[]
  ) {
    const existingTour = await this.tourService.findById(tourId);

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

  async delete(tournament: Tournament) {
    tournament.isDeleted = true;
    return TournamentRepository.save(tournament);
  }

  async startTournamentData(tournament: Tournament, tour: Tour) {
    const clubsWithCat = await ClubRepository.getClubs(tournament.id);
    const teamsWithCat = await TeamRepository.getTeams(tournament.id);
    const userWithPoints = await TeamRepository.getAmountPointPerUser(
      tour.id,
      "Masculino-Cuarta"
    );
    console.log(userWithPoints);

    const clubData: unknown[] = [];
    const teamData: unknown[] = [];

    if (!clubsWithCat || clubsWithCat.length == 0) {
      throw new Error("Error al iniciar el torneo: No se encontraron datos");
    }

    if (!teamsWithCat || teamsWithCat.length == 0) {
      throw new Error("Error al iniciar el torneo: No se encontraron datos");
    }

    for (const cwc of clubsWithCat) {
      clubData.push({
        clubName: cwc.clubName,
        master: cwc.master,
        avFrom: new Date(cwc.availableFrom),
        avTo: new Date(cwc.availableTo),
        ctNumbers: cwc.courtNumbers.split(", "),
      });
    }

    for (const twc of teamsWithCat) {
      teamData.push({
        teamName: twc.teamName,
        category: twc.category,
      });
    }

    return { clubData, teamData };
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
