import { PerDataRepository, UserRepository } from "../repository";
import { PersonalData, TourCoin, User } from "../entity";
import valMessage from "../constants/validationMessages";

import { UserServiceError, ServiceCodeError } from "../errors/errorsClass";
import codeErrors from "../constants/codeErrors";
import { isNotUserAdmin } from "../helpers/validations";

export class UserService {
  constructor() {}

  async logIn(username: string, password: string) {
    const existingUser = await UserRepository.findOneBy({
      username: username,
    });

    if (!existingUser) {
      throw new UserServiceError(
        valMessage.VALUE_NOT_EXIST("Nombre de Usuario"),
        username
      );
    }

    if (!existingUser.compareHashPass(password)) {
      throw new UserServiceError(
        valMessage.VALUE_INCORRECT("Contraseña"),
        password
      );
    }

    return existingUser;
  }

  async create(user: User, perData: PersonalData, tourCoin: TourCoin) {
    const username = await UserRepository.findByUsername(user.username);
    if (username) {
      throw new UserServiceError(
        codeErrors.GEN_3("Nombre de Usuario"),
        user.username
      );
    }

    const email = await UserRepository.findByEmail(user.email);
    if (email) {
      throw new UserServiceError(codeErrors.GEN_3("Email"), user.username);
    }

    return UserRepository.create(user, perData, tourCoin);
  }

  async update(user: User, existingUser: User, perData: PersonalData) {
    const existingPerData = await PerDataRepository.findByUserId(
      existingUser.id
    );

    if (!existingPerData) {
      throw new ServiceCodeError(codeErrors.GEN_2("Personal Data"));
    }

    return UserRepository.update(existingUser, existingPerData, user, perData);
  }

  async delete(user: User) {
    isNotUserAdmin(user);
    user.isDeleted = true;
    return UserRepository.save(user);
  }

  async findByUsername(username: string) {
    const user = await UserRepository.findByUsername(username);

    if (!user) {
      throw new UserServiceError(
        valMessage.VALUE_NOT_EXIST("Nombre de Usuario"),
        username
      );
    }

    return user;
  }

  async findById(userId: string) {
    const existingUser = await UserRepository.findOneBy({
      id: userId,
    });

    if (!existingUser) {
      throw new UserServiceError(codeErrors.GEN_1("User"), userId);
    }
    return existingUser;
  }

  async findByIdWithPersonalData(userId: string) {
    const userData = await UserRepository.findUserWithPerData(userId);

    if (!userData) {
      throw new UserServiceError(valMessage.VALUE_NOT_EXIST("User ID"), userId);
    }

    const user = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      isSingle: userData.isSingle,
      isDeleted: userData.isDeleted,
      role: userData.role,
    };

    return { user: user, perData: userData.personalData };
  }

  async getAll(tourId: string) {
    const users: unknown[] = await UserRepository.getAll(tourId);

    if (users.length == 0) {
      throw new ServiceCodeError(codeErrors.GEN_2("Usuarios"));
    }
    return users;
  }

  async getRanking(tourId: string, category: string) {
    const users: unknown[] = await UserRepository.getRanking(tourId, category);

    if (users.length == 0) {
      throw new ServiceCodeError(codeErrors.GEN_2("Usuarios"));
    }
    return users;
  }
}
