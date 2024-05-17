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
import EnterIcon from "../../../icons/EnterIcon/EnterIcon";
import UsersIcon from "../../../icons/UsersIcon/UsersIcon";
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

  const { tours, tourAPI, error } = useGetTours(user);

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
              icon={<UsersIcon width={27} height={27} color={pastelGreen} />}
            />
          </ButtonContainer>
          <InputContainer>
            <SecondaryInput
              id="searchTour"
              type="text"
              value={tourTitle}
              width={250}
              placeholder="Buscar Tour"
              icon={<SearchIcon width={20} height={17} color={darkGreen} />}
              onChange={handleChange}
            />
          </InputContainer>
        </ButtonInputContainer>
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
