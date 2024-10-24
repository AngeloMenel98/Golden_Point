import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  MainContainer,
  SpaceContainer,
  TournamentSection,
  HeaderContainer,
  ButtonContainer,
} from "./MatchesStyle";

import NavBar from "../../../components/navbar/NavBar";

import { RootState } from "../../../reduxSlices/store";
import { useLocation } from "react-router-dom";
import MatchCard from "./Cards/MatchCard/MatchCard";
import useGetMatches from "../../../hooks/useGetMatches";
import { MatchDTO } from "../../../entities/dtos/MatchDTO";
import useGetTeams from "../../../hooks/useGetTeams";
import Breadcrumb from "../../../components/breadcrumb/BreadCrumb";
import useGetCatsByTournId from "../../../hooks/useGetCatsByTournId";
import DropDownUnique from "../../../components/dropdown/DropDownSingle/DropDown/DropDown";
import BouncingCircles from "../../../components/spinner/spinner";

const MatchesUser: React.FC = () => {
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

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [allMatches, setAllMatches] = useState<MatchDTO[]>([]);

  const { matches, errors, isLoading, hasFetched, refetch } = useGetMatches(
    tournamentId,
    selectedGroup,
    selectedCategory
  );

  const { allTeams } = useGetTeams(tournamentId);

  useEffect(() => {
    refetch();
  }, [selectedGroup, selectedCategory, refetch]);

  useEffect(() => {
    setAllMatches(matches);
  }, [matches]);

  const handleChangeGroup = (group: string) => {
    setSelectedGroup(group);
  };

  const handleChangeCat = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredMatches = allMatches.filter(
    (m) => m.GroupName === selectedGroup && m.CategoryTeam == selectedCategory
  );

  const breadcrumbPath = [
    { name: "Tours", link: "/" },
    { name: "Torneos", link: "/tournaments" },
    { name: "Partidos", link: `/matches?tournamentId=${tournamentId}` },
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
            <DropDownUnique
              buttonText="Categoria"
              items={cats}
              width={225}
              error={""}
              onChange={handleChangeCat}
            />
          </ButtonContainer>
          <ButtonContainer>
            <DropDownUnique
              buttonText="Instancia"
              items={stages}
              width={150}
              error={""}
              onChange={handleChangeGroup}
            />
          </ButtonContainer>
        </SpaceContainer>
        {hasFetched && (
          <SpaceContainer>
            <MatchCard
              error={errors.notFound}
              matches={filteredMatches}
              teams={allTeams}
            />
          </SpaceContainer>
        )}
        {isLoading && (
          <SpaceContainer>
            <BouncingCircles text="categoria e instancia" />
          </SpaceContainer>
        )}
      </TournamentSection>
    </MainContainer>
  );
};

export default MatchesUser;
