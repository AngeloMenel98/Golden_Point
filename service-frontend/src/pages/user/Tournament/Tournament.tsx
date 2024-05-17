import React, { useState } from "react";
import { useSelector } from "react-redux";

import { darkGreen } from "../../../utils/colors";
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
  NavBarContainer,
  SpaceContainer,
  TournamentSection,
} from "./TournamentStyle";

export interface CreationData {
  tournamentName: string;
  master: number;
  maleCat: string[];
  femaleCat: string[];
}

const TournamentUser: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const tourData = useSelector((state: RootState) => state.tour.tour);

  const [tournamentTitle, setTournTitle] = useState("");

  const { tournaments, tournAPI, error } = useGetTournaments(tourData);

  const handleTournTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTournTitle(e.target.value);
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
          <InputContainer>
            <SecondaryInput
              id="searchTournament"
              type="text"
              value={tournamentTitle}
              width={250}
              placeholder="Buscar Torneo"
              icon={<SearchIcon width={20} height={18} color={darkGreen} />}
              onChange={handleTournTitle}
            />
          </InputContainer>
        </SpaceContainer>
        <TournamentCard
          tournaments={tournaments}
          tournamentTitle={tournamentTitle}
          tournApi={tournAPI}
          error={error}
        />
      </TournamentSection>
    </MainContainer>
  );
};

export default TournamentUser;
