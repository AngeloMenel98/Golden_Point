import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import {
  ButtonContainer,
  ButtonInputContainer,
  TourSection,
  InputContainer,
  MainContainer,
  NavBarContainer,
} from "./TourStyles";
import { User } from "../../entities/User";
import { jwtDecode } from "jwt-decode";
import SecondaryButton from "../../components/buttons/SecondaryButton/SecondaryButton";
import SearchIcon from "../../icons/SearchIcon/SearchIcon";
import { darkGreen } from "../../utils/colors";
import TourRow from "./TourRow/TourRow";
import SecondaryInput from "../../components/inputs/SecondaryInput/SecondaryInput";

const Tour: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tour, setTour] = useState<string>("");

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    throw new Error("Function not implemented.");
  };

  return (
    <MainContainer>
      <NavBarContainer>
        <NavBar userName={user ? user.username : ""} />
      </NavBarContainer>
      <TourSection>
        <ButtonInputContainer>
          <ButtonContainer>
            <SecondaryButton text="Crear Tour" onClick={handleClick} />
          </ButtonContainer>

          <InputContainer>
            <SecondaryInput
              id="searchTour"
              type="text"
              value={tour}
              placeholder="Buscar Tour"
              icon={<SearchIcon width={20} height={17} color={darkGreen} />}
              onChange={handleChange}
            />
          </InputContainer>
        </ButtonInputContainer>

        <TourRow />
      </TourSection>
    </MainContainer>
  );
};

export default Tour;
