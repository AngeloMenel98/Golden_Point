import React, { useState } from "react";
import { useSelector } from "react-redux";

import NavBar from "../../../components/navbar/NavBar";
import SecondaryInput from "../../../components/inputs/SecondaryInput/SecondaryInput";

import TourCard from "./TourCard/TourCard";

import {
  ButtonContainer,
  ButtonInputContainer,
  H2,
  InputContainer,
  MainContainer,
  NavBarContainer,
  TourSection,
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

export interface CreationData {
  tourName: string;
  clubName: string;
  address: string;
  courts: string;
  avFrom: string;
  avTo: string;
}

const ToursUser: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const [tourTitle, setTourTitle] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Errors>();

  const { tours, tourAPI, error } = useGetTours(user);

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
      <NavBarContainer>
        <NavBar userName={user?.UserName} />
      </NavBarContainer>
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
          <InputContainer>
            <SecondaryInput
              id="searchTour"
              type="text"
              value={tourTitle}
              placeholder="Buscar Tour"
              icon={<SearchIcon width={20} height={17} color={darkGreen} />}
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
        <H2>Todos los Tours</H2>
        <TourCard
          tours={tours}
          tourApi={tourAPI}
          tourTitle={tourTitle}
          error={error}
        />
      </TourSection>
    </MainContainer>
  );
};
export default ToursUser;
