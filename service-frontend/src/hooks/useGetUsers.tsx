import { useEffect, useState } from "react";
import UserAPI from "../services/UserApi";
import { UserDTO } from "../entities/dtos/UserDTO";
import { ApiError } from "../services/GeneralApi";

const userAPI = new UserAPI();

export default function useGetUsers(tourId: string | undefined) {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [errorUsers, setError] = useState<string>("");

  if (!tourId) {
    return { users, userAPI, errorUsers };
  }

  const getUsers = async () => {
    try {
      const data = await userAPI.getUsers(tourId);

      const userArray: UserDTO[] = [];

      data.forEach((u: any) => {
        const newUser = new UserDTO();

        newUser.Id = u.userid;
        newUser.UserName = u.username;
        newUser.Email = u.email;
        newUser.IsSingle = u.issingle;
        newUser.LastName = u.lastname;
        newUser.FirstName = u.firstname;
        newUser.PhoneNumber = u.phonenumber;
        newUser.Location = u.location;

        userArray.push(newUser);
      });

      setUsers(userArray);
    } catch (err) {
      if (err instanceof ApiError && err.payload.fieldErrors) {
        setError(err.payload.fieldErrors.notFound ?? "");
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return {
    users,
    userAPI,
    errorUsers,
  };
}
