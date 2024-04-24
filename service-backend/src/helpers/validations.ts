import codeErrors from "../constants/codeErrors";
import { User } from "../entity";
import { UserRole } from "../entity/User";
import { ServiceCodeError } from "../errors/errorsClass";

export const isNotUserAdmin = (user: User) => {
  if (user.role != UserRole.ADMIN) {
    throw new ServiceCodeError(codeErrors.USER_1);
  }
};
