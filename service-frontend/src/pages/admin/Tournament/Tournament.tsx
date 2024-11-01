import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  H3,
  MainContainer,
  SpaceContainer,
  TournamentSection,
  HeaderContainer,
  HeaderButtons,
  InputContainer,
  ButtonContainer,
  BreadCrumbContainer,
} from "./TournamentStyle";
import { darkGreen, pastelGreen } from "../../../utils/colors";
import SearchIcon from "../../../icons/SearchIcon/SearchIcon";
import RankingIcon from "../../../icons/RankingIcon/RankingIcon";

import NavBar from "../../../components/navbar/NavBar";
import TournamentCard from "./Cards/TournamentCard/TournamentCard";
import SecondaryButton from "../../../components/buttons/SecondaryButton/SecondaryButton";
import SecondaryInput from "../../../components/inputs/SecondaryInput/SecondaryInput";

import { RootState } from "../../../reduxSlices/store";
import TournamentModal from "./Modals/CreateTournament/TournamentModal";
import useGetTournaments from "../../../hooks/useGetTournaments";
import { Category } from "../../../entities/dtos/TournamentDTO";
import TournamentAPI, {
  TournCredentials,
} from "../../../services/TournamentApi";
import { Errors } from "../../../errors/Errors";
import UsersIcon from "../../../icons/UsersIcon/UsersIcon";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb/BreadCrumb";
import Footer from "../../../components/footer/footer";
import BouncingCircles from "../../../components/spinner/spinner";
import UsersModal from "../../../components/userModal/UsersModal";
import { CreationTournament } from "../../../utils/interfaces";

const tournApi = new TournamentAPI();

const Tournament: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const tour = useSelector((state: RootState) => state.tour.tour);

  const navigate = useNavigate();
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isUserOpen, setUserOpen] = useState(false);
  const [tournamentTitle, setTournTitle] = useState("");

  const [data, setData] = useState<CreationTournament>({
    tournamentName: "",
    master: 0,
    maleCat: [],
    femaleCat: [],
  });

  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const { tournaments, errors, isLoading, refetch, hasFetched } =
    useGetTournaments(tour);

  useEffect(() => {
    refetch();
  }, [refetch]);

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
      userId: user?.id,
      tourId: tour?.id,
      title: data.tournamentName,
      master: data.master,
      categories: categories,
    };

    const res = await tournApi.addTournament(tournament);

    if (res.fieldErrors) {
      setFieldErrors((prevErrors: any) => ({
        ...prevErrors,
        ...res.fieldErrors,
      }));
    } else {
      createCloseModal();
      refetch();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const openRankings = () => {
    navigate("/ranking");
  };
  const openCalendarClubs = () => {
    navigate("/calendarClubs");
  };

  const breadcrumbPath = [
    { name: "Tours", link: "/" },
    { name: "Torneos", link: "/tournaments" },
  ];

  const [showFooter, setShowFooter] = useState(false);

  return (
    <MainContainer>
      <NavBar userName={user?.userName} />
      <TournamentSection>
        <BreadCrumbContainer>
          <Breadcrumb path={breadcrumbPath} />
        </BreadCrumbContainer>
        <HeaderContainer>
          <H3>Tour: {tour?.tourTitle}</H3>
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
              tourId={tour?.id}
              onClose={usersCloseModal}
              isAddTeam={false}
            />
          )}
          <HeaderButtons>
            <SecondaryButton
              text="Rankings"
              icon={<RankingIcon width={23} height={18} color={pastelGreen} />}
              onClick={openRankings}
            />
          </HeaderButtons>

          <HeaderButtons>
            <SecondaryButton text="Clubs" onClick={openCalendarClubs} />
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

        <H3>Lista de Torneos</H3>
        {hasFetched && (
          <TournamentCard
            tournaments={tournaments}
            tournamentTitle={tournamentTitle}
            error={errors.notFound}
            isLoading={isLoading}
            refetch={refetch}
            setShFooter={setShowFooter}
          />
        )}
        {isLoading && (
          <SpaceContainer>
            <BouncingCircles text="torneos" />
          </SpaceContainer>
        )}
      </TournamentSection>

      {showFooter && (
        <Footer
          message="El torneo fue iniciado correctamente"
          isSuccess={true}
        />
      )}
    </MainContainer>
  );
};

export default Tournament;
