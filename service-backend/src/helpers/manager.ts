import { User } from "../entity";
import { UserService } from "../services";
import { isNotUserAdmin } from "./validations";

export class Manager {
  private static instance: Manager;
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public static getInstance(): Manager {
    if (!Manager.instance) {
      Manager.instance = new Manager();
    }
    return Manager.instance;
  }

  public async checkUserExists(userId: string) {
    return this.userService.findById(userId);
  }

  public async checkUserWithData(userId: string) {
    return this.userService.findByIdWithPersonalData(userId);
  }

  public async checkIfADMIN(adminUser: User) {
    isNotUserAdmin(adminUser);
  }
}
