import React from "react";
import {
  MainContainer,
  NavBarContainer,
  TournamentSection,
} from "./TournamentStyle";
import NavBar from "../../components/navbar/NavBar";
import SecondaryButton from "../../components/buttons/SecondaryButton/SecondaryButton";

const Tournament: React.FC = () => {
  return (
    <MainContainer>
      <NavBarContainer>
        <NavBar userName="pepe" />
      </NavBarContainer>
      <TournamentSection>
        <SecondaryButton text="Crear Tour" />
      </TournamentSection>
    </MainContainer>
  );
};

export default Tournament;
