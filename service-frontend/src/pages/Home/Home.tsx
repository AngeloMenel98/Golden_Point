import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import { HomeSection, MainContainer } from "./HomeStyles";
import { User } from "../../entities/User";
import { jwtDecode } from "jwt-decode";
import SecondaryButton from "../../components/buttons/SecondaryButton/SecondaryButton";

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };

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

        setUser(newUser);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleClick = async () => {};

  return (
    <MainContainer>
      <NavBar userName={user ? user.username : ""} />
      <HomeSection>
        <SecondaryButton text="Crear Tour" onClick={handleClick} />
      </HomeSection>
    </MainContainer>
  );
};

export default Home;
