export class GroupDTO {
  teamsId: string[];
  courtsId: string[];
  matchDates: Date[];
  tourPoints: number;
  tourCoins: number;
  groupName: string;

  constructor(
    teamsId: string[],
    courtsId: string[],
    matchDates: Date[],
    tourPoints: number,
    tourCoins: number,
    groupName: string
  ) {
    this.teamsId = teamsId;
    this.courtsId = courtsId;
    this.matchDates = matchDates;
    this.tourPoints = tourPoints;
    this.tourCoins = tourCoins;
    this.groupName = groupName;
  }
}
