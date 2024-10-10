export interface Category {
  category: string;
  gender: string;
}

export class TournamentDTO {
  private id: string = "";
  private title: string = "";
  private teamsCount: number = 0;
  private master: number = 0;
  private categories: Category[] = [];
  private hasStarted: boolean = false;

  //Setters
  set Id(value: string) {
    this.id = value;
  }

  set Title(value: string) {
    this.title = value;
  }

  set TeamsCount(value: number) {
    this.teamsCount = value;
  }

  set Master(value: number) {
    this.master = value;
  }

  set Categories(value: Category[]) {
    this.categories = value;
  }

  set HasStarted(value: boolean) {
    this.hasStarted = value;
  }

  //Getters
  get Id(): string {
    return this.id;
  }

  get Title(): string {
    return this.title;
  }

  get TeamsCount(): number {
    return this.teamsCount;
  }

  get Master(): number {
    return this.master;
  }

  get Categories(): Category[] {
    return this.categories;
  }

  get HasStarted(): boolean {
    return this.hasStarted;
  }
}
