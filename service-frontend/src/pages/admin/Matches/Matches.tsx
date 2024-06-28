import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  H2,
  MainContainer,
  SpaceContainer,
  TournamentSection,
  HeaderContainer,
  ButtonContainer,
} from "./MatchesStyle";

import NavBar from "../../../components/navbar/NavBar";

import { RootState } from "../../../reduxSlices/store";
import { Errors } from "../../../errors/Errors";
import { useLocation } from "react-router-dom";
import DropDown from "../../../components/dropdown/DropDown/DropDown";
import MatchCard from "./Cards/MatchCard/MatchCard";
import useGetMatches from "../../../hooks/useGetMatches";
import { MatchDTO } from "../../../entities/dtos/MatchDTO";

const Matches: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tournamentId = params.get("tournamentId");
  let allMatches: MatchDTO[] = [];

  const cats = ["Masculino-Septima", "Masculino-Sexta"];
  const stages = [
    "Grupo 1",
    "Grupo 2",
    "Grupo 3",
    "Grupo 4",
    "Cuartos de Final",
    "Semi-Final",
    "Final",
  ];

  const [selectedCategory, setSelectedCategory] = useState<string[]>([
    "Masculino-Septima",
  ]);
  const [selectedGroup, setSelectedGroup] = useState<string[]>(["Grupo 1"]);
  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const { matches } = useGetMatches(
    tournamentId,
    selectedGroup[0],
    selectedCategory[0]
  );

  allMatches = matches;

  const handleChangeGroup = (group: string[]) => {
    setSelectedGroup(group);
  };

  const handleChangeCat = (category: string[]) => {
    setSelectedCategory(category);
  };

  const filteredMatches = allMatches.filter(
    (m) => m.GroupName === selectedGroup[0]
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
              onChange={handleChangeCat}
              amountChars={20}
            />
          </ButtonContainer>
          <ButtonContainer>
            <DropDown
              buttonText="Instancia"
              items={stages}
              width={150}
              error={fieldErrors.notFound}
              onChange={handleChangeGroup}
              amountChars={20}
            />
          </ButtonContainer>
        </SpaceContainer>
        <SpaceContainer>
          <MatchCard error={""} matches={filteredMatches} />
        </SpaceContainer>
      </TournamentSection>
    </MainContainer>
  );
};

export default Matches;
