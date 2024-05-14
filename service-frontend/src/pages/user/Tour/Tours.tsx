import React, { useState } from "react";
import { useSelector } from "react-redux";

import NavBar from "../../../components/navbar/NavBar";
import SecondaryInput from "../../../components/inputs/SecondaryInput/SecondaryInput";

import {
  TourSection,
  InputContainer,
  MainContainer,
  NavBarContainer,
  H2,
} from "./TourStyles";
import { darkGreen } from "../../../utils/colors";
import SearchIcon from "../../../icons/SearchIcon/SearchIcon";

import TourCard from "./TourCard/TourCard";
import { TourFieldErrors } from "../../../errors/TourErrors";
import { RootState } from "../../../reduxSlices/store";
import useGetTours from "../../../hooks/useGetTours";

const ToursUser: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const { tours, tourAPI } = useGetTours(user);

  const [tourTitle, setTourTitle] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<TourFieldErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTourTitle(e.target.value);
  };

  return (
    <MainContainer>
      <NavBarContainer>
        <NavBar userName={user?.UserName} />
      </NavBarContainer>
      <TourSection>
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
        <H2>Todos los Tours</H2>
        <TourCard tours={tours} tourApi={tourAPI} tourTitle={tourTitle} />
      </TourSection>
    </MainContainer>
  );
};

export default ToursUser;
