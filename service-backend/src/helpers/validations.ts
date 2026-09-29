import { User } from "../entity";
import { UserRole } from "../entity/User";
import { validationError } from "../types/error/app-error";

export const isNotUserAdmin = (user: User) => {
  if (user.role != UserRole.ADMIN) {
    throw validationError("El usuario no es ADMIN");
  }
};
