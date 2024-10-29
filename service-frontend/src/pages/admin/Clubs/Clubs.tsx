import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  MainContainer,
  ClubSection,
  HeaderContainer,
  InputContainer,
  SpaceContainer,
} from "./ClubsStyle";

import NavBar from "../../../components/navbar/NavBar";

import { RootState } from "../../../reduxSlices/store";
import Breadcrumb from "../../../components/breadcrumb/BreadCrumb";
import useGetClubs from "../../../hooks/useGetClubs";
import { ClubDTO } from "../../../entities/dtos/ClubDTO";
import SecondaryInput from "../../../components/inputs/SecondaryInput/SecondaryInput";
import SearchIcon from "../../../icons/SearchIcon/SearchIcon";
import { darkGreen } from "../../../utils/colors";
import ClubCard from "./Cards/ClubCard";

const Clubs: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const tour = useSelector((state: RootState) => state.tour.tour);

  const [clubName, setClubName] = useState<string>("");
  const [clubSelected, setClubsSelected] = useState<ClubDTO[]>([]);

  const { allClubs, errors, isLoading, refetch, hasFetched, addClubToState } =
    useGetClubs(user?.id, false, tour?.id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClubName(e.target.value);
  };

  const breadcrumbPath = [
    { name: "Tours", link: "/" },
    { name: "Torneos", link: "/tournaments" },
    { name: "Clubs", link: `/calendarClubs` },
  ];

  return (
    <MainContainer>
      <NavBar userName={user?.userName} />
      <ClubSection>
        <HeaderContainer>
          <Breadcrumb path={breadcrumbPath} />
        </HeaderContainer>

        <InputContainer>
          <SecondaryInput
            id="searchTour"
            type="text"
            value={clubName}
            placeholder="Buscar Club"
            icon={<SearchIcon width={20} height={17} color={darkGreen} />}
            maxLength={10}
            isBig={true}
            onChange={handleChange}
          />
        </InputContainer>
        {hasFetched && (
          <SpaceContainer>
            <ClubCard
              clubs={allClubs}
              clubName={clubName}
              error={errors?.notFound}
              refetch={refetch}
            />
          </SpaceContainer>
        )}
      </ClubSection>
    </MainContainer>
  );
};

export default Clubs;
