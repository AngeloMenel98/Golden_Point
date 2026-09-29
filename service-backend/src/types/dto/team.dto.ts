import { Team } from "../../entity/Team";

export type TeamResponse = {
  id: string;
  teamName: string;
  category: string;
  users: { id: string; username: string }[];
};

export type TeamCreateRequest = {
  teamName: string;
  category: string;
  userIds: string[];
};

export type TeamRankingData = {
  teamId: string;
  groupStageId: string;
  matchesWon: number;
  gamesDiff: number;
};
