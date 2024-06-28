export class MatchDTO {
  private id: string = "";
  private amountTourPoints: number = 0;
  private amountTourCoins: number = 0;
  private matchDate: string = "";
  private clubName: string = "";
  private court: string = "";
  private groupName: string = "";
  private teamsName: string[] = [];

  //Setters
  set Id(value: string) {
    this.id = value;
  }

  set AmountTourPoints(value: number) {
    this.amountTourPoints = value;
  }

  set AmountTourCoins(value: number) {
    this.amountTourCoins = value;
  }

  set MatchDate(value: string) {
    this.matchDate = value;
  }

  set ClubName(value: string) {
    this.clubName = value;
  }
  set Court(value: string) {
    this.court = value;
  }
  set GroupName(value: string) {
    this.groupName = value;
  }
  set TeamsName(value: string[]) {
    this.teamsName = value;
  }

  //Getters
  get Id(): string {
    return this.id;
  }

  get AmountTourPoints(): number {
    return this.amountTourPoints;
  }

  get AmountTourCoins(): number {
    return this.amountTourCoins;
  }

  get MatchDate(): string {
    return this.matchDate;
  }

  get ClubName(): string {
    return this.clubName;
  }
  get Court(): string {
    return this.court;
  }

  get GroupName(): string {
    return this.groupName;
  }
  get TeamsName(): string[] {
    return this.teamsName;
  }
}
