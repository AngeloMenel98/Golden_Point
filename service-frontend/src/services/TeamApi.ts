import { Category } from "../entities/dtos/TournamentDTO";
import { isAxiosError } from "../errors/AxiosError";
import GeneralAPI from "./GeneralApi";

export interface DeletedTeam {
  tournamentId: string;
  userId?: string;
}

export interface TeamCredentials {
  adminUserId?: string;
  tournamentId?: string;
  category: string;
  usersId: string[];
}

class TeamAPI extends GeneralAPI {
  async addTeam(newTeam: TeamCredentials) {
    try {
      const res = await this.api.post("/team/create", newTeam);
      return res.data;
    } catch (e) {
      return isAxiosError(e);
    }
  }

  /*async getTournaments(tourId: string) {
    try {
      const res = await this.api.get(`/tournament/tourns/${tourId}`);
      return res.data;
    } catch (e) {
      return isAxiosError(e);
    }
  }*/

  /* async deleteTournament(deletedTour: DeletedTournament) {
    try {
      const res = await this.api.post("/tournament/delete", deletedTour);
      return res.data;
    } catch (e) {
      return isAxiosError(e);
    }
  }*/
}

export default TeamAPI;
