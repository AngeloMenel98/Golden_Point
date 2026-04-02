import { User, UserRole } from "../../entity/User";
import { PersonalData } from "../../entity/PersonalData";

export type UserResponse = {
  id: string;
  username: string;
  email: string;
  isSingle: boolean;
  role: UserRole;
  firstName?: string;
  lastName?: string;
};

export type UserDetailResponse = UserResponse & {
  personalData: {
    firstName: string;
    lastName: string;
    location: string;
    phoneNumber: string;
  } | null;
};

export type UserCreateRequest = Pick<
  User,
  "username" | "email" | "password"
> & {
  firstName: string;
  lastName: string;
  location: string;
  phoneNumber: string;
};

export type UserUpdateRequest = Partial<Pick<User, "password" | "isSingle">> & {
  firstName?: string;
  lastName?: string;
  location?: string;
  phoneNumber?: string;
};

export type UserLoginRequest = Pick<User, "username" | "password">;

export type UserLoginResponse = {
  token: string;
  user: UserResponse;
};

export type UserRankingResult = {
  id: string;
  lastName: string;
  firstName: string;
  totalPoints: number;
};

export type UserListResult = {
  userId: string;
  userName: string;
  lastName: string;
  firstName: string;
};

export type UserStatsResponse = {
  userId: string;
  matchesPlayed: number;
  wins: number;
  losses: number;
  winRate: number;
  gamesWon: number;
  gamesLost: number;
  totalPoints: number;
};

export type UserRankingResponse = {
  userId: string;
  userName: string;
  position: number;
  points: number;
};
