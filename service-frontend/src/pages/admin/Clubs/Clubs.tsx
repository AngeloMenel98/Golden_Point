<<<<<<< HEAD
import React from "react";
import { useSelector } from "react-redux";

import { MainContainer, ClubSection, HeaderContainer } from "./ClubsStyle";
=======
import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  MainContainer,
  ClubSection,
  HeaderContainer,
  InputContainer,
  SpaceContainer,
} from "./ClubsStyle";
>>>>>>> develop

import NavBar from "../../../components/navbar/NavBar";

import { RootState } from "../../../reduxSlices/store";
import Breadcrumb from "../../../components/breadcrumb/BreadCrumb";
<<<<<<< HEAD

const Clubs: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  /*const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tournamentId = params.get("tournamentId") || "";*/
=======
import useGetClubs from "../../../hooks/useGetClubs";
import SecondaryInput from "../../../components/inputs/SecondaryInput/SecondaryInput";
import SearchIcon from "../../../icons/SearchIcon/SearchIcon";
import { darkGreen } from "../../../utils/colors";
import ClubCard from "./Cards/ClubCard";

const Clubs: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const tour = useSelector((state: RootState) => state.tour.tour);

  const [clubName, setClubName] = useState<string>("");
  //const [clubSelected, setClubsSelected] = useState<ClubDTO[]>([]);

  const { allClubs, errors, refetch, hasFetched } = useGetClubs(
    user?.id,
    false,
    tour?.id
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClubName(e.target.value);
  };
>>>>>>> develop

  const breadcrumbPath = [
    { name: "Tours", link: "/" },
    { name: "Torneos", link: "/tournaments" },
<<<<<<< HEAD
    { name: "Clubs", link: `/clubs` },
=======
    { name: "Clubs", link: `/calendarClubs` },
>>>>>>> develop
  ];

  return (
    <MainContainer>
      <NavBar userName={user?.userName} />
      <ClubSection>
        <HeaderContainer>
          <Breadcrumb path={breadcrumbPath} />
        </HeaderContainer>
<<<<<<< HEAD
        {/*<SpaceContainer>
          <ButtonContainer>
            <DropDown
              buttonText="Categoria"
              items={cats}
              width={225}
              error={""}
              onChange={handleChangeCat}
              amountChars={20}
            />
          </ButtonContainer>
          <ButtonContainer>
            <DropDown
              buttonText="Instancia"
              items={stages}
              width={150}
              error={""}
              onChange={handleChangeGroup}
              amountChars={20}
            />
          </ButtonContainer>
        </SpaceContainer>
        <SpaceContainer>
          <MatchCard
            error={errors.notFound}
            matches={filteredMatches}
            teams={allTeams}
            reloadMatches={reloadMatches}
          />
        </SpaceContainer>*/}
=======

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
>>>>>>> develop
      </ClubSection>
    </MainContainer>
  );
};

export default Clubs;
