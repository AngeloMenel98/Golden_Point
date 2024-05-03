export class User {
  private id: string = "";
  private userName: string = "";
  private email: string = "";
  private isSingle: boolean = true;
  private role: string = "";

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
  set Role(value: string) {
    this.role = value;
  }

  //Getters
  get Id(): string {
    return this.id;
  }

  get username(): string {
    return this.userName;
  }

  get Email(): string {
    return this.email;
  }

  get IsSingle(): boolean {
    return this.isSingle;
  }

  get Role(): string {
    return this.role;
  }
}
