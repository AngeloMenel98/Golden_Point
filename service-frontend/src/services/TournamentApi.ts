import { Category } from "../entities/dtos/TournamentDTO";
import GeneralAPI from "./GeneralApi";

export interface DeletedTournament {
  tournamentId: string;
  userId?: string;
}

export interface TournCredentials {
  userId?: string;
  tourId?: string;
  title: string;
  master: number;
  categories: Category[];
}

interface TournamentData {
  [tournamentId: string]: {
    tournamentName: string;
    teamsCount: string;
    master: number;
    categories: Category[];
    status: string;
  };
}

class TournamentAPI extends GeneralAPI {
  async addTournament(_newTournament: TournCredentials): Promise<void> {
    await this.api.post("/tournament/create", _newTournament);
  }

  async getTournaments(tourId: string): Promise<TournamentData> {
    const res = await this.api.get(`/tournament/tourns/${tourId}`);
    return res as unknown as TournamentData;
  }

  async deleteTournament(_deletedTournament: DeletedTournament): Promise<void> {
    await this.api.post("/tournament/delete", _deletedTournament);
  }

  async startTournament(_startTournament: DeletedTournament): Promise<void> {
    await this.api.post("/tournament/start", _startTournament);
  }

  async getCatsByTournId(tournId: string): Promise<unknown> {
    return this.api.get(`/tournament/cats/${tournId}`);
  }

  async getMyTournaments(userId: string): Promise<unknown[]> {
    const res = await this.api.get(`/tournament/${userId}`);
    return res as unknown as unknown[];
  }
}

export default TournamentAPI;
