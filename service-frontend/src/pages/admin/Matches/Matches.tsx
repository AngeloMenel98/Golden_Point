import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  H2,
  MainContainer,
  SpaceContainer,
  TournamentSection,
  HeaderContainer,
  ButtonContainer,
  HeaderButtons,
} from "./MatchesStyle";

import NavBar from "../../../components/navbar/NavBar";

import { RootState } from "../../../reduxSlices/store";
import { useLocation } from "react-router-dom";
import DropDown from "../../../components/dropdown/DropDown/DropDown";
import MatchCard from "./Cards/MatchCard/MatchCard";
import useGetMatches from "../../../hooks/useGetMatches";
import { MatchDTO } from "../../../entities/dtos/MatchDTO";
import useGetTeams from "../../../hooks/useGetTeams";
import SecondaryButton from "../../../components/buttons/SecondaryButton/SecondaryButton";
import { useNavigate } from "react-router-dom";
import useGetCatsByTournId from "../../../hooks/useGetCatsByTournId";

const Matches: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const tournamentId = params.get("tournamentId") || "";

  const cats = useGetCatsByTournId(tournamentId);
  const stages = [
    "Grupo 1",
    "Grupo 2",
    "Grupo 3",
    "Grupo 4",
    "Cuartos de Final",
    "Semi-Final",
    "Final",
  ];

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string[]>([]);
  const [allMatches, setAllMatches] = useState<MatchDTO[]>([]);

  const { matches, errors, refetch } = useGetMatches(
    tournamentId,
    selectedGroup[0],
    selectedCategory[0]
  );
  const { allTeams } = useGetTeams(tournamentId);

  useEffect(() => {
    refetch();
  }, [selectedGroup, selectedCategory, refetch]);

  useEffect(() => {
    setAllMatches(matches);
  }, [matches]);

  const handleChangeGroup = (group: string[]) => {
    setSelectedGroup(group);
  };

  const handleChangeCat = (category: string[]) => {
    setSelectedCategory(category);
  };

  const returnToTournaments = () => {
    navigate("/tournaments");
  };

  const filteredMatches = allMatches.filter(
    (m) =>
      m.GroupName === selectedGroup[0] && m.CategoryTeam == selectedCategory[0]
  );

  return (
    <MainContainer>
      <NavBar userName={user?.UserName} />
      <TournamentSection>
        <HeaderContainer>
          <H2>Partidos</H2>
          <HeaderButtons>
            <SecondaryButton text="Torneos" onClick={returnToTournaments} />
          </HeaderButtons>
        </HeaderContainer>
        <SpaceContainer>
          <ButtonContainer>
            <DropDown
              buttonText="Categoria"
              items={cats}
              width={225}
              error={""}
              onChange={handleChangeCat}
              amountChars={20}
            />
          </ButtonContainer>
          <ButtonContainer>
            <DropDown
              buttonText="Instancia"
              items={stages}
              width={150}
              error={""}
              onChange={handleChangeGroup}
              amountChars={20}
            />
          </ButtonContainer>
        </SpaceContainer>
        <SpaceContainer>
          <MatchCard
            error={errors.notFound}
            matches={filteredMatches}
            teams={allTeams}
          />
        </SpaceContainer>
      </TournamentSection>
    </MainContainer>
  );
};

export default Matches;
