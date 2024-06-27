export class MatchDTO {
  private id: string = "";
  private amountTourPoints: number = 0;
  private amountTourCoins: number = 0;
  private matchDate: string = "";

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
}
