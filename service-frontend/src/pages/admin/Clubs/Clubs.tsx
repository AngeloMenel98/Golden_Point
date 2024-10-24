import React from "react";
import { useSelector } from "react-redux";

import { MainContainer, ClubSection, HeaderContainer } from "./ClubsStyle";

import NavBar from "../../../components/navbar/NavBar";

import { RootState } from "../../../reduxSlices/store";
import Breadcrumb from "../../../components/breadcrumb/BreadCrumb";

const Clubs: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  /*const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tournamentId = params.get("tournamentId") || "";*/

  const breadcrumbPath = [
    { name: "Tours", link: "/" },
    { name: "Torneos", link: "/tournaments" },
    { name: "Clubs", link: `/clubs` },
  ];

  return (
    <MainContainer>
      <NavBar userName={user?.UserName} />
      <ClubSection>
        <HeaderContainer>
          <Breadcrumb path={breadcrumbPath} />
        </HeaderContainer>
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
      </ClubSection>
    </MainContainer>
  );
};

export default Clubs;
