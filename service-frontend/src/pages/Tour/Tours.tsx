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
import { TourDTO } from "../../entities/dtos/TourDTO";
import TourAPI from "../../services/TourApi";
import TourModal from "./TourModal/TourModal";
import { TourFieldErrors } from "../../errors/TourErrors";

const tourAPI = new TourAPI();

const Tours: React.FC = () => {
  const [user, setUser] = useState<User>(new User());
  const [tourTitle, setTourTitle] = useState<string>("");
  const [tours, setTours] = useState<TourDTO[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<TourFieldErrors>({});

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
        getTours();
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const getTours = async () => {
    const tourArray: TourDTO[] = [];
    const tourRes = await tourAPI.getTours(user.Id);

    tourRes.forEach((t: any) => {
      const newTour = new TourDTO();

      newTour.Id = t.tourid;
      newTour.TourTitle = t.tourtitle;
      newTour.TourCode = t.tourcode;
      newTour.UserCount = t.usercount;
      newTour.TournamentCount = t.tournamentcount;
      newTour.UserOwner = t.firstusername;

      tourArray.push(newTour);
    });

    setTours(tourArray);
  };

  const handleOpenModal = async () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
            <SecondaryButton text="Crear Tour" onClick={handleOpenModal} />
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
        {isModalOpen && (
          <TourModal
            onClose={handleCloseModal}
            user={user}
            tourApi={tourAPI}
            fieldErrors={fieldErrors}
          />
        )}
        <H2>Todos los Tours</H2>
        <TourCard tours={tours} tourApi={tourAPI} user={user} />
      </TourSection>
    </MainContainer>
  );
};

export default Tours;
