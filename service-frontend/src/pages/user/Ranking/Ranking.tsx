import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  MainContainer,
  RankingSection,
  HeaderContainer,
  H2,
  HeaderButtons,
  SpaceContainer,
  TableContainer,
} from "./RankingStyle";

import NavBar from "../../../components/navbar/NavBar";

import { RootState } from "../../../reduxSlices/store";
import DropDown from "../../../components/dropdown/DropDown/DropDown";
import SecondaryButton from "../../../components/buttons/SecondaryButton/SecondaryButton";
import { useNavigate } from "react-router-dom";
import UserAPI from "../../../services/UserApi";
import { Errors } from "../../../errors/Errors";
import { darkGreen, pastelGreen } from "../../../utils/colors";
import UsersTable from "../../../components/userTable/UserTable";

const userAPI = new UserAPI();

interface UserRanking {
  id: string;
  lastname: string;
  firstname: string;
  totalpoints: string;
}

const Rankings: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const tour = useSelector((state: RootState) => state.tour.tour);

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [users, setUsers] = useState<UserRanking[]>([]);

  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const returnToTournaments = () => {
    navigate("/tournaments");
  };

  const handleChangeCat = async (category: string[]) => {
    setSelectedCategory(category);

    await getRanking(category[0]);
  };

  const getRanking = async (category: string) => {
    const res = await userAPI.getRanking(tour?.Id, category);
    if (res.fieldErrors) {
      setFieldErrors((prevErrors: any) => ({
        ...prevErrors,
        ...res.fieldErrors,
      }));
    } else {
      setUsers(res);
    }
  };

  return (
    <MainContainer>
      <NavBar userName={user?.UserName} />
      <RankingSection>
        <HeaderContainer>
          <H2>Ranking</H2>
          <HeaderButtons>
            <SecondaryButton text="Torneos" onClick={returnToTournaments} />
          </HeaderButtons>
          <HeaderButtons></HeaderButtons>
        </HeaderContainer>
        <SpaceContainer>
          <DropDown
            buttonText="Categoria"
            items={[
              "Masculino-Sexta",
              "Masculino-Septima",
              "Masculino-Quinta",
              "Femenino-Sexta",
              "Femenino-Septima",
            ]}
            width={225}
            error={""}
            onChange={handleChangeCat}
            amountChars={20}
          />
        </SpaceContainer>
        <TableContainer>
          <UsersTable users={users} />
        </TableContainer>
      </RankingSection>
    </MainContainer>
  );
};

export default Rankings;
