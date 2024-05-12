import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logInUser } from "../reduxSlices/user/userSlice";
import { User } from "../entities/User";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

const useSetUser = () => {
  const dispatch = useDispatch();
  const newUser = new User();

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      try {
        const decodeToken: any = jwtDecode(token);

        newUser.Id = decodeToken.id;
        newUser.UserName = decodeToken.username;
        newUser.Email = decodeToken.email;
        newUser.IsSingle = decodeToken.isSingle;
        newUser.Role = decodeToken.role;

        dispatch(logInUser(newUser));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [dispatch]);

  return { newUser };
};

export default useSetUser;
