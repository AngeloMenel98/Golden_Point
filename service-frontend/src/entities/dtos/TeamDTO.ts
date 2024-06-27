export class TeamDTO {
  private teamId: string = "";
  private tourId: string = "";
  private usersId: string = "";
  private teamName: string = "";
  private category: string = "";
  private tournamentName: string = "";

  //Setters
  set TeamId(value: string) {
    this.teamId = value;
  }

  set TourId(value: string) {
    this.tourId = value;
  }

  set UsersId(value: string) {
    this.usersId = value;
  }

  set TeamName(value: string) {
    this.teamName = value;
  }

  set Category(value: string) {
    this.category = value;
  }

  set TournamentName(value: string) {
    this.tournamentName = value;
  }

  //Getters
  get TeamId(): string {
    return this.teamId;
  }

  get TourId(): string {
    return this.tourId;
  }

  get UsersId(): string {
    return this.usersId;
  }

  get TeamName(): string {
    return this.teamName;
  }

  get Category(): string {
    return this.category;
  }

  get TournamentName(): string {
    return this.tournamentName;
  }
}
