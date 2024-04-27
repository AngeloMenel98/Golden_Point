export class GroupDTO {
  teamsId: string[];
  courtsId: string[];
  matchDates: Date[];
  tourPoints: number;
  tourCoins: number;

  constructor(
    teamsId: string[],
    courtsId: string[],
    matchDates: Date[],
    tourPoints: number,
    tourCoins: number
  ) {
    this.teamsId = teamsId;
    this.courtsId = courtsId;
    this.matchDates = matchDates;
    this.tourPoints = tourPoints;
    this.tourCoins = tourCoins;
  }
}
