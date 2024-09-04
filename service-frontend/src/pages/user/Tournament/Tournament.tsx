import React, { useState } from "react";
import { useSelector } from "react-redux";

import { darkGreen, pastelGreen } from "../../../utils/colors";
import SearchIcon from "../../../icons/SearchIcon/SearchIcon";
import RankingIcon from "../../../icons/RankingIcon/RankingIcon";

import NavBar from "../../../components/navbar/NavBar";
import TournamentCard from "./Card/TournamentCard";
import SecondaryButton from "../../../components/buttons/SecondaryButton/SecondaryButton";
import SecondaryInput from "../../../components/inputs/SecondaryInput/SecondaryInput";

import { RootState } from "../../../reduxSlices/store";
import useGetTournaments from "../../../hooks/useGetTournaments";
import { MainContainer } from "../Tour/TourStyles";
import {
  H2,
  HeaderButtons,
  InputContainer,
  SpaceContainer,
  TournamentSection,
} from "./TournamentStyle";
import UsersIcon from "../../../icons/UsersIcon/UsersIcon";
import UsersModal from "./Modal/UsersModal/UsersModal";
import { useNavigate } from "react-router-dom";

export interface CreationData {
  tournamentName: string;
  master: number;
  maleCat: string[];
  femaleCat: string[];
}

const TournamentUser: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const tourData = useSelector((state: RootState) => state.tour.tour);

  const navigate = useNavigate();

  const [tournamentTitle, setTournTitle] = useState("");
  const [isUserOpen, setUserOpen] = useState(false);

  const usersOpenModal = () => {
    setUserOpen(true);
  };

  const usersCloseModal = () => {
    setUserOpen(false);
  };

  const { tournaments, errorTournament } = useGetTournaments(tourData);

  const handleTournTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTournTitle(e.target.value);
  };

  const returnToTours = () => {
    navigate("/");
  };

  const openRankings = () => {
    navigate("/ranking");
  };

  return (
    <MainContainer>
      <NavBar userName={user?.UserName} />
      <TournamentSection>
        <SpaceContainer>
          <H2>Tour: {tourData?.TourTitle}</H2>
          <HeaderButtons>
            <SecondaryButton
              icon={
                <UsersIcon
                  width={23}
                  height={23}
                  color={pastelGreen}
                  onClick={usersOpenModal}
                />
              }
              onClick={usersOpenModal}
            />
          </HeaderButtons>
          <HeaderButtons>
            <SecondaryButton text="Tours" onClick={returnToTours} />
          </HeaderButtons>
          {isUserOpen && (
            <UsersModal tourId={tourData?.Id} onClose={usersCloseModal} />
          )}
          <HeaderButtons>
            <SecondaryButton
              text="Rankings"
              icon={<RankingIcon width={20} height={18} color={darkGreen} />}
              onClick={openRankings}
            />
          </HeaderButtons>
        </SpaceContainer>
        <SpaceContainer>
          <InputContainer id="input">
            <SecondaryInput
              id="searchTournament"
              type="text"
              value={tournamentTitle}
              placeholder="Buscar Torneo"
              icon={<SearchIcon width={20} height={18} color={darkGreen} />}
              onChange={handleTournTitle}
            />
          </InputContainer>
        </SpaceContainer>
        <H2>Lista de Torneos</H2>
        <TournamentCard
          tournaments={tournaments}
          tournamentTitle={tournamentTitle}
          error={errorTournament}
        />
      </TournamentSection>
    </MainContainer>
  );
};

export default TournamentUser;
