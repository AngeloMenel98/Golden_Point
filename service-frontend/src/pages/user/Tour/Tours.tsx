import React, { useState } from "react";
import { useSelector } from "react-redux";

import NavBar from "../../../components/navbar/NavBar";
import SecondaryInput from "../../../components/inputs/SecondaryInput/SecondaryInput";

import TourCard from "./TourCard/TourCard";

import {
  ButtonContainer,
  ButtonInputContainer,
  H2,
  H4,
  InputContainer,
  MainContainer,
  TourSection,
  TableContainer,
} from "./TourStyles";
import { darkGreen, pastelGreen } from "../../../utils/colors";
import SearchIcon from "../../../icons/SearchIcon/SearchIcon";

import { RootState } from "../../../reduxSlices/store";
import useGetTours from "../../../hooks/useGetTours";
import SecondaryButton from "../../../components/buttons/SecondaryButton/SecondaryButton";

import JoinIcon from "../../../icons/JoinIcon/JoinIcon";
import JoinModal from "./Modals/JoinModal/JoinModal";
import { JoinCredentials } from "../../../services/TourApi";
import { Errors } from "../../../errors/Errors";
import { TourDTO } from "../../../entities/dtos/TourDTO";
import ArrowLeftIcon from "../../../icons/ArrowLeftIcon/ArrowLeftIcon";
import useGetMyTourns from "../../../hooks/useGetMyTourns";
import MyTournsCards from "../../../components/myTourns/myTournsCard";

export interface CreationData {
  tourName: string;
  clubName: string;
  address: string;
  courts: string;
  avFrom: string;
  avTo: string;
}

const ToursUser: React.FC = () => {
  const user = useSelector((state: RootState) => state.user?.user);

  const [tourTitle, setTourTitle] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Errors>();

  const { tours, tourAPI, error, addTourToState } = useGetTours(user);
  const { tournaments, loading } = useGetMyTourns(user?.Id);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleJoin = async () => {
    const joinCred: JoinCredentials = {
      userId: user?.Id,
      tourCode: code,
    };
    const res = await tourAPI.joinUser(joinCred);

    if (res.fieldErrors) {
      setFieldErrors((prevErrors: any) => ({
        ...prevErrors,
        ...res.fieldErrors,
      }));
    } else {
      const newTour: TourDTO = new TourDTO();
      newTour.Id = res.id;
      newTour.TourTitle = res.title;
      newTour.TourCode = res.tourCode;
      newTour.UserCount = 1;
      newTour.TournamentCount = 0;
      newTour.UserOwner = user?.UserName || "";
      addTourToState(newTour);
      handleCloseModal();
    }
  };

  const handleJoinCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTourTitle(e.target.value);
  };

  return (
    <MainContainer>
      <NavBar userName={user?.UserName} />
      <TourSection>
        <ButtonInputContainer>
          <ButtonContainer>
            <SecondaryButton
              icon={
                <JoinIcon
                  width={25}
                  height={22}
                  color={pastelGreen}
                  onClick={handleOpenModal}
                />
              }
              onClick={handleOpenModal}
            />
          </ButtonContainer>
          <ButtonInputContainer>
            <ArrowLeftIcon width={21} height={16} color={darkGreen} />
            <H4>Unite a un Tour</H4>
          </ButtonInputContainer>
          <InputContainer>
            <SecondaryInput
              id="searchTour"
              type="text"
              value={tourTitle}
              placeholder="Buscar Tour"
              icon={<SearchIcon width={20} height={17} color={darkGreen} />}
              isBig={true}
              onChange={handleChange}
            />
          </InputContainer>
        </ButtonInputContainer>
        {isModalOpen && (
          <JoinModal
            open={isModalOpen}
            width={250}
            code={code}
            onJoin={handleJoin}
            onJoinCode={handleJoinCode}
            onClose={handleCloseModal}
            error={fieldErrors}
          />
        )}
        <H2>Lista de Tours</H2>
        <TourCard
          tours={tours}
          tourApi={tourAPI}
          tourTitle={tourTitle}
          error={error}
        />
        {!loading && (
          <>
            <H2>Mis Partidos</H2>
            <TableContainer>
              <MyTournsCards tourns={tournaments} />
            </TableContainer>
          </>
        )}
      </TourSection>
    </MainContainer>
  );
};
export default ToursUser;
