import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  H2,
  MainContainer,
  SpaceContainer,
  TournamentSection,
  HeaderContainer,
  HeaderButtons,
} from "./MatchesStyle";

import NavBar from "../../../components/navbar/NavBar";

import { RootState } from "../../../reduxSlices/store";
import { Errors } from "../../../errors/Errors";
import { useLocation } from "react-router-dom";
import DropDown from "../../../components/dropdown/DropDown/DropDown";
import MatchCard from "./Cards/MatchCard/MatchCard";

const Matches: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tournamentId = params.get("tournamentId");

  //const tournamentCats = useGetCategories(tournamentId);
  const cats = ["Masculino-Septima", "Masculino-Octava"];
  const stages = [
    "Grupo A",
    "Grupo B",
    "Grupo C",
    "Grupo D",
    "Cuartos de Final",
    "Semi-Final",
    "Final",
  ];

  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const handleChange = () => {};

  return (
    <MainContainer>
      <NavBar userName={user?.UserName} />
      <TournamentSection>
        <HeaderContainer>
          <H2>Torneo Xs</H2>
          <HeaderButtons>
            <DropDown
              buttonText="Categoria"
              items={cats}
              width={225}
              error={fieldErrors.notFound}
              onChange={handleChange}
              amountChars={20}
            />
          </HeaderButtons>
          <HeaderButtons>
            <DropDown
              buttonText="Instancia"
              items={stages}
              width={150}
              error={fieldErrors.notFound}
              onChange={handleChange}
              amountChars={20}
            />
          </HeaderButtons>
        </HeaderContainer>
        <SpaceContainer>
          <MatchCard error={""} />
        </SpaceContainer>
      </TournamentSection>
    </MainContainer>
  );
};

export default Matches;
