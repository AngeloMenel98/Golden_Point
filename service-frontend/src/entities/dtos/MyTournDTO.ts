export class MyTournDTO {
  private id: string = "";
  private tournTitle: string = "";
  private teamCat: string = "";
  private matchDate: string = "";
  private teamName: string = "";
  private oppTeamName: string = "";
  private groupStage: string = "";

  //Setters
  set Id(value: string) {
    this.id = value;
  }

  set TournTitle(value: string) {
    this.tournTitle = value;
  }

  set TeamCat(value: string) {
    this.teamCat = value;
  }

  set MatchDate(value: string) {
    this.matchDate = value;
  }

  set TeamName(value: string) {
    this.teamName = value;
  }

  set OppTeamName(value: string) {
    this.oppTeamName = value;
  }

  set GroupStage(value: string) {
    this.groupStage = value;
  }

  //Getters
  get Id(): string {
    return this.id;
  }

  get TournTitle(): string {
    return this.tournTitle;
  }

  get TeamCat(): string {
    return this.teamCat;
  }

  get MatchDate(): string {
    return this.matchDate;
  }

  get TeamName(): string {
    return this.teamName;
  }

  get OppTeamName(): string {
    return this.oppTeamName;
  }

  get GroupStage(): string {
    return this.groupStage;
  }
}
