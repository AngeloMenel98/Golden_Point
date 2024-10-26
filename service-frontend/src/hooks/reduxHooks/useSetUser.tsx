import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logInUser } from "../../reduxSlices/user/userSlice";
import { User } from "../../entities/User";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

const useSetUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      try {
        const decodeToken: any = jwtDecode(token);

        const newUser = new User();

        newUser.Id = decodeToken.id;
        newUser.UserName = decodeToken.username;
        newUser.Email = decodeToken.email;
        newUser.IsSingle = decodeToken.isSingle;
        newUser.Role = decodeToken.role;

        const userPayload = {
          id: newUser.Id,
          userName: newUser.UserName,
          email: newUser.Email,
          isSingle: newUser.IsSingle,
          role: newUser.Role,
        };

        dispatch(logInUser(userPayload));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [dispatch]);
};

export default useSetUser;
