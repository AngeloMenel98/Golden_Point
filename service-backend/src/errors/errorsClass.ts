export class UserServiceError extends Error {
  user: string;

  constructor(message: string, user: string) {
    super(message);
    this.user = user;
  }
}

export class ServiceCodeError extends Error {
  constructor(messsage: string) {
    super(messsage);
  }
}
