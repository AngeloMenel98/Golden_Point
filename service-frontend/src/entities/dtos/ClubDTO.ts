export class ClubDTO {
  private id: string = "";
  private clubName: string = "";
  private address: string = "";
  private courtCount: number = 0;
  private avFrom: string = "";
  private avTo: string = "";

  //Setters
  set Id(value: string) {
    this.id = value;
  }

  set ClubName(value: string) {
    this.clubName = value;
  }

  set Address(value: string) {
    this.address = value;
  }

  set CourtCount(value: number) {
    this.courtCount = value;
  }

  set AvFrom(value: string) {
    this.avFrom = value;
  }

  set AvTo(value: string) {
    this.avTo = value;
  }

  //Getters
  get Id(): string {
    return this.id;
  }

  get ClubName(): string {
    return this.clubName;
  }

  get Address(): string {
    return this.address;
  }

  get CourtCount(): number {
    return this.courtCount;
  }
  get AvFrom(): string {
    return this.avFrom;
  }
  get AvTo(): string {
    return this.avTo;
  }
}
