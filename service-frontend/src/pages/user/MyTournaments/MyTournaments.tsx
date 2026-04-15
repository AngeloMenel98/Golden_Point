import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../../../components/navbar/NavBar";
import { RootState } from "../../../reduxSlices/store";
import useGetMyTourns from "../../../hooks/useGetMyTourns";
import MyTournsTable from "../../../components/myTourns/myTourns";
import { MainContainer } from "../Tour/TourStyles";
import { H3, TournamentSection, SpaceContainer } from "./MyTournamentsStyle";
import { Note } from "../../admin/Tour/Cards/TourCardStyle";

const MyTournaments: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { tournaments, loading, errorTourn, refetch } = useGetMyTourns(
    user?.id
  );

  const handleRetry = () => {
    refetch();
  };

  return (
    <MainContainer>
      <NavBar userName={user?.userName} isUser={true} />
      <TournamentSection>
        <SpaceContainer>
          <H3>Mis Torneos</H3>
        </SpaceContainer>
        {loading && (
          <SpaceContainer>
            <Note>Cargando...</Note>
          </SpaceContainer>
        )}
        {!!errorTourn && !loading && (
          <SpaceContainer>
            <Note>Error al cargar torneos</Note>
            <button onClick={handleRetry}>Reintentar</button>
          </SpaceContainer>
        )}
        {!loading && !errorTourn && tournaments.length === 0 && (
          <SpaceContainer>
            <Note>No tienes torneos asignados</Note>
          </SpaceContainer>
        )}
        {!loading && !errorTourn && tournaments.length > 0 && (
          <SpaceContainer>
            <MyTournsTable tourns={tournaments} />
          </SpaceContainer>
        )}
      </TournamentSection>
    </MainContainer>
  );
};

export default MyTournaments;
