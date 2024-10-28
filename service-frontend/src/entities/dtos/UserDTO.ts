export class UserDTO {
  private id: string = "";
  private userName: string = "";
  private email: string = "";
  private isSingle: boolean = true;
  private lastName: string = "";
  private firstName: string = "";
  private phoneNumber: string = "";
  private location: string = "";

  //Setters
  set Id(value: string) {
    this.id = value;
  }
  set UserName(value: string) {
    this.userName = value;
  }
  set Email(value: string) {
    this.email = value;
  }
  set IsSingle(value: boolean) {
    this.isSingle = value;
  }
  set LastName(value: string) {
    this.lastName = value;
  }
  set FirstName(value: string) {
    this.firstName = value;
  }
  set PhoneNumber(value: string) {
    this.phoneNumber = value;
  }
  set Location(value: string) {
    this.location = value;
  }

  //Getters
  get Id(): string {
    return this.id;
  }
  get UserName(): string {
    return this.userName;
  }
  get Email(): string {
    return this.email;
  }
  get IsSingle(): boolean {
    return this.isSingle;
  }
  get LastName(): string {
    return this.lastName;
  }
  get FirstName(): string {
    return this.firstName;
  }
  get PhoneNumber(): string {
    return this.phoneNumber;
  }
  get Location(): string {
    return this.location;
  }
}
