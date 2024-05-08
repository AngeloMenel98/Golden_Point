import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import {
  ButtonContainer,
  ButtonInputContainer,
  TourSection,
  InputContainer,
  MainContainer,
  NavBarContainer,
  H2,
} from "./TourStyles";
import { User } from "../../entities/User";
import { jwtDecode } from "jwt-decode";
import SecondaryButton from "../../components/buttons/SecondaryButton/SecondaryButton";
import SearchIcon from "../../icons/SearchIcon/SearchIcon";
import { darkGreen } from "../../utils/colors";
import SecondaryInput from "../../components/inputs/SecondaryInput/SecondaryInput";
import TourCard from "./TourCard/TourCard";
import { Tour } from "../../entities/Tour";
import TourAPI from "../../services/TourApi";

const tourAPI = new TourAPI();

const Tours: React.FC = () => {
  const [user, setUser] = useState<User>(new User());
  const [tourTitle, setTourTitle] = useState<string>("");
  const [tours, setTours] = useState<Tour[]>([]);

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };

  const getTours = async () => {
    const tourArray: Tour[] = [];
    const tourRes = await tourAPI.getTours();

    tourRes.forEach((t: any) => {
      const newTour = new Tour();

      newTour.Id = t.tourid;
      newTour.TourTitle = t.tourtitle;
      newTour.TourCode = t.tourcode;
      newTour.UserCount = t.usercount;
      newTour.TournamentCount = t.tournamentcount;

      tourArray.push(newTour);
    });

    setTours(tourArray);
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
        getTours();
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleClick = async () => {
    console.log(tours.map((t) => t.TourTitle));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTourTitle(newValue);
  };

  return (
    <MainContainer>
      <NavBarContainer>
        <NavBar userName={user.username} />
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
              value={tourTitle}
              width={250}
              placeholder="Buscar Tour"
              icon={<SearchIcon width={20} height={17} color={darkGreen} />}
              onChange={handleChange}
            />
          </InputContainer>
        </ButtonInputContainer>
        <H2>Todos los Tours</H2>
        <TourCard tours={tours} />
      </TourSection>
    </MainContainer>
  );
};

export default Tours;
