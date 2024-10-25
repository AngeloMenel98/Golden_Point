export interface UserData {
  id: string;
  userName: string;
  email: string;
  isSingle: boolean;
  role: string;
}

export interface TourData {
  id: string;
  tourTitle: string;
  tourCode: string;
  userCount: number;
  tournamentCount: number;
  userOwner: string;
}

export interface CreationTour {
  tourName: string;
  clubName: string;
  address: string;
  courts: string;
  avFrom: string;
  avTo: string;
}

export interface CreationTournament {
  tournamentName: string;
  master: number;
  maleCat: string[];
  femaleCat: string[];
}
