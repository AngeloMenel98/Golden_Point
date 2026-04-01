import { PerDataRepository, UserRepository } from "../repository";
import { PersonalData, TourCoin, User } from "../entity";
import { isNotUserAdmin } from "../helpers/validations";
import {
  UserListResult,
  UserRankingResult,
  UserStatsResponse,
  UserRankingResponse,
} from "../types/dto/user.dto";
import { notFound, conflict } from "../types/error/app-error";

export class UserService {
  constructor() {}

  async logIn(username: string, password: string) {
    const existingUser = await UserRepository.findOneBy({
      username: username,
    });

    if (!existingUser) {
      throw notFound("Nombre de Usuario", username);
    }

    if (!existingUser.compareHashPass(password)) {
      throw conflict("Contraseña incorrecta", "Contraseña");
    }

    return existingUser;
  }

  async create(user: User, perData: PersonalData, tourCoin: TourCoin) {
    const username = await UserRepository.findByUsername(user.username);
    if (username) {
      throw conflict("Nombre de Usuario ya existe", "Nombre de Usuario");
    }

    const email = await UserRepository.findByEmail(user.email);
    if (email) {
      throw conflict("Email ya existe", "Email");
    }

    return UserRepository.create(user, perData, tourCoin);
  }

  async update(user: User, existingUser: User, perData: PersonalData) {
    const existingPerData = await PerDataRepository.findByUserId(
      existingUser.id,
    );

    if (!existingPerData) {
      throw conflict("No se encontro ningún Personal Data", "Personal Data");
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
      throw notFound("Nombre de Usuario", username);
    }

    return user;
  }

  async findById(userId: string) {
    const existingUser = await UserRepository.findOneBy({
      id: userId,
    });

    if (!existingUser) {
      throw notFound("User", userId);
    }
    return existingUser;
  }

  async findByIdWithPersonalData(userId: string) {
    const userData = await UserRepository.findUserWithPerData(userId);

    if (!userData) {
      throw notFound("User ID", userId);
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

  async getAll(tourId: string): Promise<UserListResult[]> {
    const users: UserListResult[] = await UserRepository.getAll(tourId);

    if (users.length == 0) {
      throw conflict("No se encontro ningún Usuario.", "Usuarios");
    }
    return users;
  }

  async getRanking(
    tourId: string,
    category: string,
  ): Promise<UserRankingResult[]> {
    const users: UserRankingResult[] = await UserRepository.getRanking(
      tourId,
      category,
    );

    if (users.length == 0) {
      throw conflict("No se encontro ningún Usuario.", "Usuario");
    }
    return users;
  }

  async getUserStats(userId: string): Promise<UserStatsResponse> {
    const existingUser = await UserRepository.findOneBy({ id: userId });
    if (!existingUser) {
      throw notFound("Usuario", userId);
    }

    const stats = await UserRepository.getUserStats(userId);

    const { wins, losses, totalPoints, gamesWon, gamesLost } = stats;
    const matchesPlayed = wins + losses;
    const winRate = matchesPlayed > 0 ? (wins / matchesPlayed) * 100 : 0;

    return {
      userId,
      matchesPlayed,
      wins,
      losses,
      winRate: Math.round(winRate * 100) / 100,
      gamesWon,
      gamesLost,
      totalPoints,
    };
  }

  async getTournamentUserStats(
    tourId: string,
    userId: string,
  ): Promise<UserStatsResponse> {
    const existingUser = await UserRepository.findOneBy({ id: userId });
    if (!existingUser) {
      throw notFound("Usuario", userId);
    }

    const stats = await UserRepository.getTournamentUserStats(tourId, userId);

    const { wins, losses, totalPoints, gamesWon, gamesLost } = stats;
    const matchesPlayed = wins + losses;
    const winRate = matchesPlayed > 0 ? (wins / matchesPlayed) * 100 : 0;

    return {
      userId,
      matchesPlayed,
      wins,
      losses,
      winRate: Math.round(winRate * 100) / 100,
      gamesWon,
      gamesLost,
      totalPoints,
    };
  }

  async getGlobalRankings(): Promise<UserRankingResponse[]> {
    const rankings = await UserRepository.getGlobalRankings();

    return rankings.map(
      (
        r: { userId: string; userName: string; points: number },
        index: number,
      ) => ({
        userId: r.userId,
        userName: r.userName,
        position: index + 1,
        points: Number(r.points) || 0,
      }),
    );
  }

  async getTournamentRankings(tourId: string): Promise<UserRankingResponse[]> {
    const rankings = await UserRepository.getTournamentRankings(tourId);

    return rankings.map(
      (
        r: { userId: string; userName: string; points: number },
        index: number,
      ) => ({
        userId: r.userId,
        userName: r.userName,
        position: index + 1,
        points: Number(r.points) || 0,
      }),
    );
  }
}
