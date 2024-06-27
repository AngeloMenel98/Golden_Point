import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  H2,
  MainContainer,
  SpaceContainer,
  TournamentSection,
  HeaderContainer,
  HeaderButtons,
  ButtonContainer,
} from "./MatchesStyle";

import NavBar from "../../../components/navbar/NavBar";

import { RootState } from "../../../reduxSlices/store";
import { Errors } from "../../../errors/Errors";
import { useLocation } from "react-router-dom";
import DropDown from "../../../components/dropdown/DropDown/DropDown";
import MatchCard from "./Cards/MatchCard/MatchCard";
import useGetTeams from "../../../hooks/useGetTeams";
import { TeamDTO } from "../../../entities/dtos/TeamDTO";

const Matches: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tournamentId = params.get("tournamentId");
  let teams: TeamDTO[] = [];

  if (tournamentId != undefined) {
    const { allTeams } = useGetTeams(tournamentId);
    teams = allTeams;
  }

  const cats = Array.from(new Set(teams.map((t) => t.Category)));
  const stages = [
    "Grupo A",
    "Grupo B",
    "Grupo C",
    "Grupo D",
    "Cuartos de Final",
    "Semi-Final",
    "Final",
  ];

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const handleChange = () => {};

  const handleCategoryChange = (category: string[]) => {
    setSelectedCategory(category);
  };

  const filteredTeams = teams.filter(
    (team) => team.Category === selectedCategory[0]
  );

  return (
    <MainContainer>
      <NavBar userName={user?.UserName} />
      <TournamentSection>
        <HeaderContainer>
          <H2>{tournamentId}</H2>
        </HeaderContainer>
        <SpaceContainer>
          <ButtonContainer>
            <DropDown
              buttonText="Categoria"
              items={cats}
              width={225}
              error={fieldErrors.notFound}
              onChange={handleCategoryChange}
              amountChars={20}
            />
          </ButtonContainer>
          <ButtonContainer>
            <DropDown
              buttonText="Instancia"
              items={stages}
              width={150}
              error={fieldErrors.notFound}
              onChange={handleChange}
              amountChars={20}
            />
          </ButtonContainer>
        </SpaceContainer>
        <SpaceContainer>
          <MatchCard
            error={""}
            teamsName={filteredTeams.map((t) => t.TeamName)}
          />
        </SpaceContainer>
      </TournamentSection>
    </MainContainer>
  );
};

export default Matches;
