import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  MainContainer,
  RankingSection,
  SpaceContainer,
  TableContainer,
} from "./RankingStyle";

import NavBar from "../../../components/navbar/NavBar";

import { RootState } from "../../../reduxSlices/store";
import UserAPI from "../../../services/UserApi";
import { Errors } from "../../../errors/Errors";
import UsersTable from "../../../components/userTable/UserTable";
import Breadcrumb from "../../../components/breadcrumb/BreadCrumb";
import DropDownUnique from "../../../components/dropdown/DropDownSingle/DropDown/DropDown";

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

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [users, setUsers] = useState<UserRanking[]>([]);

  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const handleChangeCat = async (category: string) => {
    setSelectedCategory(category);

    await getRanking(category);
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

  const breadcrumbPath = [
    { name: "Tours", link: "/" },
    { name: "Torneos", link: "/tournaments" },
    { name: "Rankings", link: "/ranking" },
  ];

  return (
    <MainContainer>
      <NavBar userName={user?.UserName} />
      <RankingSection>
        <SpaceContainer>
          <Breadcrumb path={breadcrumbPath} />
        </SpaceContainer>
        <SpaceContainer>
          <DropDownUnique
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
