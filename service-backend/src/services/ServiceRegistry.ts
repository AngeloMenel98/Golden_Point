import { PerDataService } from "./perDataService";
import { TourService } from "./tourService";
import { UserService } from "./userService";
import { TournamentService } from "./tournamentService";
import { TeamService } from "./teamService";
import { ClubService } from "./clubService";
import { TourCoinService } from "./tourCoinService";
import { MatchService } from "./matchService";
import { SetService } from "./setService";
import { CalendarClubService } from "./calendarClubService";
import { CourtService } from "./courtService";
import { CategoryService } from "./categoryService";
import { TeamMatchService } from "./teamMatch";

export class ServiceRegistry {
  private static _perDataService?: PerDataService;
  private static _tourService?: TourService;
  private static _userService?: UserService;
  private static _tournamentService?: TournamentService;
  private static _teamService?: TeamService;
  private static _clubService?: ClubService;
  private static _tourCoinService?: TourCoinService;
  private static _matchService?: MatchService;
  private static _setService?: SetService;
  private static _calendarClubService?: CalendarClubService;
  private static _courtService?: CourtService;
  private static _categoryService?: CategoryService;
  private static _teamMatchService?: TeamMatchService;

  static get perDataService(): PerDataService {
    return (ServiceRegistry._perDataService ??= new PerDataService());
  }

  static get tourService(): TourService {
    return (ServiceRegistry._tourService ??= new TourService());
  }

  static get userService(): UserService {
    return (ServiceRegistry._userService ??= new UserService());
  }

  static get tournamentService(): TournamentService {
    return (ServiceRegistry._tournamentService ??= new TournamentService());
  }

  static get teamService(): TeamService {
    return (ServiceRegistry._teamService ??= new TeamService());
  }

  static get clubService(): ClubService {
    return (ServiceRegistry._clubService ??= new ClubService());
  }

  static get tourCoinService(): TourCoinService {
    return (ServiceRegistry._tourCoinService ??= new TourCoinService());
  }

  static get matchService(): MatchService {
    return (ServiceRegistry._matchService ??= new MatchService());
  }

  static get setService(): SetService {
    return (ServiceRegistry._setService ??= new SetService());
  }

  static get calendarClubService(): CalendarClubService {
    return (ServiceRegistry._calendarClubService ??= new CalendarClubService());
  }

  static get courtService(): CourtService {
    return (ServiceRegistry._courtService ??= new CourtService());
  }

  static get categoryService(): CategoryService {
    return (ServiceRegistry._categoryService ??= new CategoryService());
  }

  static get teamMatchService(): TeamMatchService {
    return (ServiceRegistry._teamMatchService ??= new TeamMatchService());
  }
}
