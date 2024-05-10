import React, { ChangeEvent } from "react";
import {
  H2,
  MainContainer,
  NavBarContainer,
  SpaceContainer,
  TournamentSection,
  InputContainer,
  ButtonContainer,
} from "./TournamentStyle";
import NavBar from "../../components/navbar/NavBar";
import SecondaryButton from "../../components/buttons/SecondaryButton/SecondaryButton";
import { useLocation } from "react-router-dom";
import RankingIcon from "../../icons/RankingIcon/RankingIcon";
import { darkGreen } from "../../utils/colors";
import SecondaryInput from "../../components/inputs/SecondaryInput/SecondaryInput";
import SearchIcon from "../../icons/SearchIcon/SearchIcon";
import TournamentCard from "./TournamentCard/TournamentCard";

const Tournament: React.FC = () => {
  const location = useLocation();
  const tourTitle = "";

  const { tourData, user } = location.state || {};

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <MainContainer>
      <NavBarContainer>
        <NavBar userName={user.userName} />
      </NavBarContainer>
      <TournamentSection>
        <SpaceContainer>
          <H2>{tourData.tourTitle}</H2>
          <SecondaryButton text="Usuarios" />
          <SecondaryButton text="Torneos" />
          <SecondaryButton
            text="Rankings"
            icon={<RankingIcon width={20} height={20} color={darkGreen} />}
          />
        </SpaceContainer>
        <SpaceContainer>
          <ButtonContainer>
            <SecondaryButton text="Crear Torneos" />
          </ButtonContainer>
          <InputContainer>
            <SecondaryInput
              id="searchTournament"
              type="text"
              value={tourTitle}
              width={250}
              placeholder="Buscar Torneo"
              icon={<SearchIcon width={20} height={17} color={darkGreen} />}
              onChange={handleChange}
            />
          </InputContainer>
        </SpaceContainer>
        <TournamentCard />
      </TournamentSection>
    </MainContainer>
  );
};

export default Tournament;
