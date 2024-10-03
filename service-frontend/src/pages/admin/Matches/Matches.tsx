import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  H4,
  MainContainer,
  SpaceContainer,
  TournamentSection,
  HeaderContainer,
  ButtonContainer,
} from "./MatchesStyle";

import NavBar from "../../../components/navbar/NavBar";

import { RootState } from "../../../reduxSlices/store";
import { Link, useLocation } from "react-router-dom";
import DropDown from "../../../components/dropdown/DropDown/DropDown";
import MatchCard from "./Cards/MatchCard/MatchCard";
import useGetMatches from "../../../hooks/useGetMatches";
import { MatchDTO } from "../../../entities/dtos/MatchDTO";
import useGetTeams from "../../../hooks/useGetTeams";
import useGetCatsByTournId from "../../../hooks/useGetCatsByTournId";
import Breadcrumb from "../../../components/breadcrumb/BreadCrumb";

const Matches: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const location = useLocation();
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

  const filteredMatches = allMatches.filter(
    (m) =>
      m.GroupName === selectedGroup[0] && m.CategoryTeam == selectedCategory[0]
  );

  const breadcrumbPath = [
    { name: "Tours", link: "/" },
    { name: "Tournaments", link: "/tournaments" },
    { name: "Matches", link: `/matches?tournamentId=${tournamentId}` },
  ];

  return (
    <MainContainer>
      <NavBar userName={user?.UserName} />
      <TournamentSection>
        <HeaderContainer>
          <Breadcrumb path={breadcrumbPath} />
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
