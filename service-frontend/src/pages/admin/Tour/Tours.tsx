import React, { useState } from "react";
import { useSelector } from "react-redux";

import NavBar from "../../../components/navbar/NavBar";
import SecondaryButton from "../../../components/buttons/SecondaryButton/SecondaryButton";
import SecondaryInput from "../../../components/inputs/SecondaryInput/SecondaryInput";

import TourCard from "./Cards/TourCard";
import TourModal from "./Modals/TourModal";

import {
  ButtonInputContainer,
  TourSection,
  MainContainer,
  H2,
  ButtonContainer,
  InputContainer,
} from "./TourStyles";
import { darkGreen } from "../../../utils/colors";
import SearchIcon from "../../../icons/SearchIcon/SearchIcon";

import { RootState } from "../../../reduxSlices/store";
import useGetTours from "../../../hooks/useGetTours";
import TourAPI from "../../../services/TourApi";

const tourAPI = new TourAPI();

const Tours: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const [tourTitle, setTourTitle] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { tours, error, hasFetched, refetch } = useGetTours(user);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTourTitle(e.target.value);
  };

  return (
    <MainContainer>
      <NavBar userName={user?.userName} />
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
              placeholder="Buscar Tour"
              icon={<SearchIcon width={20} height={17} color={darkGreen} />}
              maxLength={10}
              isBig={true}
              onChange={handleChange}
            />
          </InputContainer>
        </ButtonInputContainer>
        {isModalOpen && (
          <TourModal
            tourApi={tourAPI}
            onClose={handleCloseModal}
            refetch={refetch}
          />
        )}
        <H2>Lista de Tours</H2>
        {hasFetched && (
          <TourCard
            tours={tours}
            tourApi={tourAPI}
            tourTitle={tourTitle}
            error={error}
            refetch={refetch}
          />
        )}
      </TourSection>
    </MainContainer>
  );
};
export default Tours;
