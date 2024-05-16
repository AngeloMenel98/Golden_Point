import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  H2,
  MainContainer,
  NavBarContainer,
  SpaceContainer,
  TournamentSection,
  HeaderButtons,
  InputContainer,
  ButtonContainer,
} from "./TournamentStyle";
import { darkGreen } from "../../../utils/colors";
import SearchIcon from "../../../icons/SearchIcon/SearchIcon";
import RankingIcon from "../../../icons/RankingIcon/RankingIcon";

import NavBar from "../../../components/navbar/NavBar";
import TournamentCard from "./Card/TournamentCard";
import SecondaryButton from "../../../components/buttons/SecondaryButton/SecondaryButton";
import SecondaryInput from "../../../components/inputs/SecondaryInput/SecondaryInput";

import { RootState } from "../../../reduxSlices/store";
import TournamentModal from "./Modal/TournamentModal";
import useGetTournaments from "../../../hooks/useGetTournaments";
import { Category } from "../../../entities/dtos/TournamentDTO";
import { TournCredentials } from "../../../services/TournamentApi";
import { Errors } from "../../../errors/Errors";

export interface CreationData {
  tournamentName: string;
  master: number;
  maleCat: string[];
  femaleCat: string[];
}

const Tournament: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const tourData = useSelector((state: RootState) => state.tour.tour);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tournamentTitle, setTournTitle] = useState("");

  const [data, setData] = useState<CreationData>({
    tournamentName: "",
    master: 0,
    maleCat: [],
    femaleCat: [],
  });

  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const { tournaments, tournAPI, error } = useGetTournaments(tourData);

  const handleTournTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTournTitle(e.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveTournament = async () => {
    const categories: Category[] = [];

    data.maleCat.forEach((category) => {
      categories.push({
        gender: "Masculino",
        categoryName: category,
      });
    });

    data.femaleCat.forEach((category) => {
      categories.push({
        gender: "Femenino",
        categoryName: category,
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
      <NavBarContainer>
        <NavBar userName={user?.UserName} />
      </NavBarContainer>
      <TournamentSection>
        <SpaceContainer>
          <H2>{tourData?.TourTitle}</H2>
          <HeaderButtons>
            <SecondaryButton text="Usuarios" />
          </HeaderButtons>
          <HeaderButtons>
            <SecondaryButton text="Torneos" />
          </HeaderButtons>
          <HeaderButtons>
            <SecondaryButton
              text="Rankings"
              icon={<RankingIcon width={20} height={18} color={darkGreen} />}
            />
          </HeaderButtons>
        </SpaceContainer>
        <SpaceContainer>
          <ButtonContainer>
            <SecondaryButton text="Crear Torneos" onClick={handleOpenModal} />
          </ButtonContainer>
          {isModalOpen && (
            <TournamentModal
              data={data}
              onClose={handleCloseModal}
              onChangeData={handleChange}
              onSaveTourn={handleSaveTournament}
              //onChangeItems={handleSelectedItems}
              errors={fieldErrors}
            />
          )}
          <InputContainer>
            <SecondaryInput
              id="searchTournament"
              type="text"
              value={tournamentTitle}
              width={250}
              placeholder="Buscar Torneo"
              icon={<SearchIcon width={20} height={18} color={darkGreen} />}
              onChange={handleTournTitle}
            />
          </InputContainer>
        </SpaceContainer>
        <TournamentCard
          tournaments={tournaments}
          tournamentTitle={tournamentTitle}
          tournApi={tournAPI}
          error={error}
        />
      </TournamentSection>
    </MainContainer>
  );
};

export default Tournament;
