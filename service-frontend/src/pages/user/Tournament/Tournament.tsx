import React, { ChangeEvent } from "react";
import { useSelector } from "react-redux";

import {
  H2,
  MainContainer,
  NavBarContainer,
  SpaceContainer,
  TournamentSection,
  InputContainer,
} from "./TournamentStyle";
import { darkGreen } from "../../../utils/colors";
import SearchIcon from "../../../icons/SearchIcon/SearchIcon";
import RankingIcon from "../../../icons/RankingIcon/RankingIcon";

import NavBar from "../../../components/navbar/NavBar";
import TournamentCard from "./TournamentCard/TournamentCard";
import SecondaryButton from "../../../components/buttons/SecondaryButton/SecondaryButton";
import SecondaryInput from "../../../components/inputs/SecondaryInput/SecondaryInput";

import { RootState } from "../../../reduxSlices/store";

const TournamentUser: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const tourData = useSelector((state: RootState) => state.tour.tour);
  const tourTitle = "";

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <MainContainer>
      <NavBarContainer>
        <NavBar userName={user?.UserName} />
      </NavBarContainer>
      <TournamentSection>
        <SpaceContainer>
          <H2>{tourData?.TourTitle}</H2>
          <SecondaryButton text="Torneos" />
          <SecondaryButton
            text="Rankings"
            icon={<RankingIcon width={20} height={20} color={darkGreen} />}
          />
        </SpaceContainer>
        <SpaceContainer>
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

export default TournamentUser;
