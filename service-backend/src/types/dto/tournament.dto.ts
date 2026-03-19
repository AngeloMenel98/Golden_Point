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
