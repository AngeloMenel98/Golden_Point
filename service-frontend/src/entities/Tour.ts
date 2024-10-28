export class Tour {
  private id: string = "";
  private title: string = "";
  private tourCode: string = "";
  private isDeleted: boolean = false;

  //Setters
  set Id(value: string) {
    this.id = value;
  }

  set Title(value: string) {
    this.title = value;
  }
  set TourCode(value: string) {
    this.tourCode = value;
  }
  set IsDeleted(value: boolean) {
    this.isDeleted = value;
  }

  //Getters
  get Id(): string {
    return this.id;
  }

  get Title(): string {
    return this.title;
  }

  get TourCode(): string {
    return this.tourCode;
  }

  get IsDeleted(): boolean {
    return this.isDeleted;
  }
}
