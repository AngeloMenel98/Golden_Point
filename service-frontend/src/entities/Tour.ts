export class Tour {
  private id: string = "";
  private tourTitle: string = "";
  private tourCode: string = "";
  private userCount: number = 0;
  private tournamentCount: number = 0;

  //Setters
  set Id(value: string) {
    this.id = value;
  }

  set TourTitle(value: string) {
    this.tourTitle = value;
  }

  set TourCode(value: string) {
    this.tourCode = value;
  }

  set UserCount(value: number) {
    this.userCount = value;
  }

  set TournamentCount(value: number) {
    this.tournamentCount = value;
  }

  //Getters
  get Id(): string {
    return this.id;
  }

  get TourTitle(): string {
    return this.tourTitle;
  }

  get TourCode(): string {
    return this.tourCode;
  }

  get UserCount(): number {
    return this.userCount;
  }

  get TournamentCount(): number {
    return this.tournamentCount;
  }
}
