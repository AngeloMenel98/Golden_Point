import { Match } from "../../entity/Match";

export type MatchResponse = {
  id: string;
  amountTourPoints: number;
  amountTourCoins: number;
  matchDate: string;
  tournamentId: string;
  courtId: string;
  groupStage: string;
};

export type MatchCreateRequest = {
  teamIds: string[];
  tournamentId: string;
  courtId: string;
  groupStage: string;
  matchDate: string;
  amountTourPoints: number;
  amountTourCoins: number;
};

export type SetResult = {
  gamesTeam1: number;
  gamesTeam2: number;
};
