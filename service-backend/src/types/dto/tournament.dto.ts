import { Tournament, Status } from "../../entity/Tournament";

export type TournamentResponse = {
  id: string;
  title: string;
  master: number;
  status: Status;
  isDeleted: boolean;
};

export type TournamentCreateRequest = {
  title: string;
  master: number;
  categoryIds: string[];
};

export type TournamentData = {
  tournamentid: string;
  tournamentname: string;
  teamscount: string;
  master: number;
  gender_category: string;
  status: Status;
};

export type TournamentStartData = {
  clubData: ClubData[];
  teamData: TeamData[];
};

export type ClubData = {
  clubName: string;
  master: number;
  avFrom: Date;
  avTo: Date;
  allHours?: Date[];
  ctNumbers: string[];
  categories: string[];
};

export type TeamData = {
  teamId: string;
  teamName: string;
  category: string;
  totalPoints: number;
  usersId: string[];
};

// Knockout Automation DTOs
export type KnockoutResult = {
  stage: string;
  matchesCreated: number;
  teams: string[];
};

export type StageCompletion = {
  complete: boolean;
  teams?: QualifiedTeam[];
};

export type QualifiedTeam = {
  teamId: string;
  groupStageId: string;
  matchesWon: number;
  gamesDiff: number;
  matchOrder?: number; // For knockout stages: which match number (1,2,3,4)
};

export type KnockoutTriggerResponse = {
  triggered: boolean;
  message: string;
  stage?: string;
  matchesCreated?: number;
};
