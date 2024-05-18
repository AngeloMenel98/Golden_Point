import { useEffect, useState } from "react";
import UserAPI from "../services/UserApi";
import { UserDTO } from "../entities/dtos/UserDTO";

const userAPI = new UserAPI();

export default function useGetUsers(tourId: string | undefined) {
  const [users, setUsers] = useState<UserDTO[]>([]);

  const [errorUsers, setError] = useState<string>("");

  if (!tourId) {
    return { users, userAPI, errorUsers };
  }

  const getUsers = async () => {
    const userArray: UserDTO[] = [];

    const userRes = await userAPI.getUsers(tourId);

    if (userRes.fieldErrors) {
      setError(userRes.fieldErrors.notFound);

      return {
        users,
        userAPI,
        errorUsers,
      };
    }

    userRes.forEach((u: any) => {
      const newUser = new UserDTO();

      newUser.Id = u.id;
      newUser.UserName = u.username;
      newUser.Email = u.email;
      newUser.IsSingle = u.issingle;
      newUser.LastName = u.lastname;
      newUser.FirstName = u.firstname;
      newUser.PhoneNumber = u.phonenumber;
      newUser.Location = u.location;

      userArray.push(newUser);
    });

    console.log(userArray);

    setUsers(userArray);
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
