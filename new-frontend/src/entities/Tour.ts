export interface Tour {
  id: string;
  name: string;          // tourTitle from backend
  tourCode: string;      // 6 characters
  userCount: number;
  tournamentCount: number;
  userOwner: string;
  createdAt?: Date;
}

// Legacy alias for existing code that may use different field names
export interface LegacyTour {
  id: number;
  name: string;
  tourCode: string;
  createdAt?: Date;
}
