import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";

import {
  H2,
  MainContainer,
  NavBarContainer,
  SpaceContainer,
  TournamentSection,
  HeaderButtons,
  InputContainer,
  ButtonContainer,
} from "./TournamentStyle";
import { darkGreen } from "../../../utils/colors";
import SearchIcon from "../../../icons/SearchIcon/SearchIcon";
import RankingIcon from "../../../icons/RankingIcon/RankingIcon";

import NavBar from "../../../components/navbar/NavBar";
import TournamentCard from "./Card/TournamentCard";
import SecondaryButton from "../../../components/buttons/SecondaryButton/SecondaryButton";
import SecondaryInput from "../../../components/inputs/SecondaryInput/SecondaryInput";

import { RootState } from "../../../reduxSlices/store";
import TournamentModal from "./Modal/TournamentModal";
import useGetTournaments from "../../../hooks/useGetTournaments";

const Tournament: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const tourData = useSelector((state: RootState) => state.tour.tour);

  const { tournaments, tournAPI } = useGetTournaments(tourData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tournamentTitle, setTournTitle] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setTournTitle(e.target.value);
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <MainContainer>
      <NavBarContainer>
        <NavBar userName={user?.UserName} />
      </NavBarContainer>
      <TournamentSection>
        <SpaceContainer>
          <H2>{tourData?.TourTitle}</H2>
          <HeaderButtons>
            <SecondaryButton text="Usuarios" />
          </HeaderButtons>
          <HeaderButtons>
            <SecondaryButton text="Torneos" />
          </HeaderButtons>
          <HeaderButtons>
            <SecondaryButton
              text="Rankings"
              icon={<RankingIcon width={20} height={18} color={darkGreen} />}
            />
          </HeaderButtons>
        </SpaceContainer>
        <SpaceContainer>
          <ButtonContainer>
            <SecondaryButton text="Crear Torneos" onClick={handleOpenModal} />
          </ButtonContainer>
          {isModalOpen && (
            <TournamentModal onClose={handleCloseModal} tournApi={tournAPI} />
          )}
          <InputContainer>
            <SecondaryInput
              id="searchTournament"
              type="text"
              value={tournamentTitle}
              width={250}
              placeholder="Buscar Torneo"
              icon={<SearchIcon width={20} height={18} color={darkGreen} />}
              onChange={handleChange}
            />
          </InputContainer>
        </SpaceContainer>
        <TournamentCard
          tournaments={tournaments}
          tournamentTitle={tournamentTitle}
          tournApi={tournAPI}
        />
      </TournamentSection>
    </MainContainer>
  );
};

export default Tournament;
