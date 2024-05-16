import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import NavBar from "../../../components/navbar/NavBar";
import SecondaryButton from "../../../components/buttons/SecondaryButton/SecondaryButton";
import SecondaryInput from "../../../components/inputs/SecondaryInput/SecondaryInput";

import {
  ButtonContainer,
  ButtonInputContainer,
  TourSection,
  InputContainer,
  MainContainer,
  NavBarContainer,
  H2,
} from "./TourStyles";
import { darkGreen } from "../../../utils/colors";
import SearchIcon from "../../../icons/SearchIcon/SearchIcon";

import TourCard from "./TourCard/TourCard";
import TourModal from "./TourModal/TourModal";
import { TourFieldErrors } from "../../../errors/TourErrors";
import { RootState } from "../../../reduxSlices/store";
import useGetTours from "../../../hooks/useGetTours";
import ClubAPI, { ClubCredentials } from "../../../services/ClubApi";
import { TourCredentials } from "../../../services/TourApi";
import { ClubDTO } from "../../../entities/dtos/ClubDTO";

export interface CreationData {
  tourName: string;
  clubName: string;
  address: string;
  courts: string;
  avFrom: string;
  avTo: string;
}

const clubAPI = new ClubAPI();

const Tours: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const [data, setData] = useState<CreationData>({
    tourName: "",
    clubName: "",
    address: "",
    courts: "",
    avFrom: "",
    avTo: "",
  });

  const [clubsSelected, setClubsSelected] = useState<ClubDTO[]>([]);
  const [tourTitle, setTourTitle] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<TourFieldErrors>({});

  const { tours, tourAPI, error } = useGetTours(user);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTourTitle(e.target.value);
  };

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSaveClub = async () => {
    const club: ClubCredentials = {
      userId: user?.Id,
      clubName: data.clubName,
      address: data.address,
      availableFrom: data.avFrom,
      availableTo: data.avTo,
      courtsNumber: data.courts,
    };

    const res = await clubAPI.addClub(club);

    if (res.fieldErrors) {
      setFieldErrors((prevErrors: any) => ({
        ...prevErrors,
        ...res.fieldErrors,
      }));
    }
  };

  const handleSaveTour = async () => {
    const tour: TourCredentials = {
      userId: user?.Id,
      clubsId: clubsSelected.map((c) => c.Id),
      title: data.tourName,
    };

    const res = await tourAPI.addTour(tour);

    if (res.fieldErrors) {
      setFieldErrors((prevErrors: any) => ({
        ...prevErrors,
        ...res.fieldErrors,
      }));
    }
  };

  const handleCheckboxChange = (club: ClubDTO, isChecked: boolean) => {
    if (isChecked) {
      setClubsSelected([...clubsSelected, club]);
    } else {
      setClubsSelected(clubsSelected.filter((c) => c !== club));
    }
  };

  return (
    <MainContainer>
      <NavBarContainer>
        <NavBar userName={user?.UserName} />
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
            data={data}
            saveClubs={handleSaveClub}
            saveTour={handleSaveTour}
            onCheckBox={handleCheckboxChange}
            onChange={handleData}
            onClose={handleCloseModal}
            errors={fieldErrors}
          />
        )}
        <H2>Todos los Tours</H2>
        <TourCard
          tours={tours}
          tourApi={tourAPI}
          tourTitle={tourTitle}
          error={error}
        />
      </TourSection>
    </MainContainer>
  );
};
export default Tours;
