export interface ClubData {
  clubName: string;
  master: number;
  avFrom: Date;
  avTo: Date;
  allHours?: Date[];
  ctNumbers: string[];
  categories: string[];
}

export interface TeamData {
  teamId: string;
  teamName: string;
  category: string;
  totalPoints: number;
  usersId: string[];
}

export interface CourtData {
  courtId: string;
  allHours: Date[];
}

export interface TourData {
  tournamentid: string;
  tournamentname: string;
  teamscount: string;
  master: number;
  gender_category: string;
}
