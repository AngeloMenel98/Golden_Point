import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  H2,
  MainContainer,
  SpaceContainer,
  TournamentSection,
  HeaderContainer,
  HeaderButtons,
  InputContainer,
  ButtonContainer,
} from "./TournamentStyle";
import { darkGreen, pastelGreen } from "../../../utils/colors";
import SearchIcon from "../../../icons/SearchIcon/SearchIcon";
import RankingIcon from "../../../icons/RankingIcon/RankingIcon";

import NavBar from "../../../components/navbar/NavBar";
import TournamentCard from "./Card/TournamentCard/TournamentCard";
import SecondaryButton from "../../../components/buttons/SecondaryButton/SecondaryButton";
import SecondaryInput from "../../../components/inputs/SecondaryInput/SecondaryInput";

import { RootState } from "../../../reduxSlices/store";
import TournamentModal from "./Modal/CreateTournament/TournamentModal";
import useGetTournaments from "../../../hooks/useGetTournaments";
import { Category } from "../../../entities/dtos/TournamentDTO";
import { TournCredentials } from "../../../services/TournamentApi";
import { Errors } from "../../../errors/Errors";
import UsersIcon from "../../../icons/UsersIcon/UsersIcon";
import UsersModal from "./Modal/UsersModal/UsersModal";

export interface CreationData {
  tournamentName: string;
  master: number;
  maleCat: string[];
  femaleCat: string[];
}

const Tournament: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const tourData = useSelector((state: RootState) => state.tour.tour);

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isUserOpen, setUserOpen] = useState(false);
  const [tournamentTitle, setTournTitle] = useState("");

  const [data, setData] = useState<CreationData>({
    tournamentName: "",
    master: 0,
    maleCat: [],
    femaleCat: [],
  });

  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const { tournaments, tournAPI, errorTournament } =
    useGetTournaments(tourData);

  const handleTournTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTournTitle(e.target.value);
  };

  const createOpenModal = () => {
    setCreateOpen(true);
  };

  const usersOpenModal = () => {
    setUserOpen(true);
  };

  const createCloseModal = () => {
    setFieldErrors({});
    setCreateOpen(false);
  };

  const usersCloseModal = () => {
    setUserOpen(false);
  };

  const handleSaveTournament = async () => {
    setFieldErrors({});
    const categories: Category[] = [];

    data.maleCat.forEach((category) => {
      categories.push({
        gender: "Masculino",
        category: category,
      });
    });

    data.femaleCat.forEach((category) => {
      categories.push({
        gender: "Femenino",
        category: category,
      });
    });

    const tournament: TournCredentials = {
      userId: user?.Id,
      tourId: tourData?.Id,
      title: data.tournamentName,
      master: data.master,
      categories: categories,
    };

    const res = await tournAPI.addTournament(tournament);

    if (res.fieldErrors) {
      setFieldErrors((prevErrors: any) => ({
        ...prevErrors,
        ...res.fieldErrors,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  return (
    <MainContainer>
      <NavBar userName={user?.UserName} />
      <TournamentSection>
        <HeaderContainer>
          <H2>{tourData?.TourTitle}</H2>
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
              tourId={tourData?.Id}
              onClose={usersCloseModal}
              isAddTeam={false}
              onNext={() => {}}
              onPlayersChange={() => {}}
            />
          )}

          <HeaderButtons>
            <SecondaryButton text="Torneos" />
          </HeaderButtons>
          <HeaderButtons>
            <SecondaryButton
              text="Rankings"
              icon={<RankingIcon width={23} height={18} color={pastelGreen} />}
            />
          </HeaderButtons>
        </HeaderContainer>
        <SpaceContainer>
          <ButtonContainer>
            <SecondaryButton text="Crear Torneos" onClick={createOpenModal} />
          </ButtonContainer>

          {isCreateOpen && (
            <TournamentModal
              data={data}
              onClose={createCloseModal}
              onChangeData={handleChange}
              onSaveTourn={handleSaveTournament}
              errors={fieldErrors}
            />
          )}

          <InputContainer>
            <SecondaryInput
              id="searchTournament"
              type="text"
              value={tournamentTitle}
              placeholder="Buscar Torneo"
              isBig={true}
              icon={<SearchIcon width={20} height={18} color={darkGreen} />}
              onChange={handleTournTitle}
            />
          </InputContainer>
        </SpaceContainer>
        <TournamentCard
          tournaments={tournaments}
          tournamentTitle={tournamentTitle}
          error={errorTournament}
        />
      </TournamentSection>
    </MainContainer>
  );
};

export default Tournament;
