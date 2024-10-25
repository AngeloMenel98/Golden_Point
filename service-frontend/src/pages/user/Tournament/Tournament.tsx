import React, { useState } from "react";
import { useSelector } from "react-redux";

import { darkGreen, pastelGreen } from "../../../utils/colors";
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
  BreadCrumbContainer,
  H3,
  HeaderButtons,
  InputContainer,
  SpaceContainer,
  TournamentSection,
} from "./TournamentStyle";
import UsersIcon from "../../../icons/UsersIcon/UsersIcon";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb/BreadCrumb";
import UsersModal from "../../../components/userModal/UsersModal";

const TournamentUser: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const tourData = useSelector((state: RootState) => state.tour.tour);

  const navigate = useNavigate();

  const [tournamentTitle, setTournTitle] = useState("");
  const [isUserOpen, setUserOpen] = useState(false);

  const usersOpenModal = () => {
    setUserOpen(true);
  };

  const usersCloseModal = () => {
    setUserOpen(false);
  };

  const { tournaments, errors, hasFetched } = useGetTournaments(tourData);

  const handleTournTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTournTitle(e.target.value);
  };

  const openRankings = () => {
    navigate("/ranking");
  };

  const breadcrumbPath = [
    { name: "Tours", link: "/" },
    { name: "Torneos", link: "/tournaments" },
  ];

  return (
    <MainContainer>
      <NavBar userName={user?.userName} />
      <TournamentSection>
        <BreadCrumbContainer>
          <Breadcrumb path={breadcrumbPath} />
        </BreadCrumbContainer>
        <SpaceContainer>
          <H3>Tour: {tourData?.tourTitle}</H3>
          <HeaderButtons>
            <SecondaryButton
              icon={
                <UsersIcon
                  width={23}
                  height={23}
                  color={pastelGreen}
                  onClick={usersOpenModal}
                />
              }
              onClick={usersOpenModal}
            />
          </HeaderButtons>
          {isUserOpen && (
            <UsersModal
              tourId={tourData?.id}
              onClose={usersCloseModal}
              isAddTeam={false}
            />
          )}
          <HeaderButtons>
            <SecondaryButton
              text="Rankings"
              icon={<RankingIcon width={20} height={18} color={darkGreen} />}
              onClick={openRankings}
            />
          </HeaderButtons>
        </SpaceContainer>
        <SpaceContainer>
          <InputContainer>
            <SecondaryInput
              id="searchTournament"
              type="text"
              value={tournamentTitle}
              placeholder="Buscar Torneo"
              icon={<SearchIcon width={20} height={18} color={darkGreen} />}
              onChange={handleTournTitle}
            />
          </InputContainer>
        </SpaceContainer>
        <H3>Lista de Torneos</H3>
        {hasFetched && (
          <TournamentCard
            tournaments={tournaments}
            tournamentTitle={tournamentTitle}
            error={errors.notFound}
          />
        )}
      </TournamentSection>
    </MainContainer>
  );
};

export default TournamentUser;
