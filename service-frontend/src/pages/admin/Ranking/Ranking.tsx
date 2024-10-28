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
import UsersTable from "../../../components/userTable/UserTable";
import Breadcrumb from "../../../components/breadcrumb/BreadCrumb";
import DropDownUnique from "../../../components/dropdown/DropDownSingle/DropDown/DropDown";
import useGetRankings from "../../../hooks/useGetRankings";
import BouncingCircles from "../../../components/spinner/spinner";

const Rankings: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const tour = useSelector((state: RootState) => state.tour.tour);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { users, isLoading, hasFetched, fieldErrors, refetch } = useGetRankings(
    tour?.id,
    selectedCategory
  );

  const handleChangeCat = async (category: string) => {
    setSelectedCategory(category);
    refetch();
  };

  const breadcrumbPath = [
    { name: "Tours", link: "/" },
    { name: "Torneos", link: "/tournaments" },
    { name: "Rankings", link: "/ranking" },
  ];

  return (
    <MainContainer>
      <NavBar userName={user?.userName} />
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
              "Femenino-Quinta",
            ]}
            width={225}
            error={fieldErrors?.notFound}
            onChange={handleChangeCat}
          />
        </SpaceContainer>
        {hasFetched && (
          <TableContainer>
            <UsersTable users={users} />
          </TableContainer>
        )}
        {isLoading && (
          <TableContainer>
            <BouncingCircles text="categoría" />
          </TableContainer>
        )}
      </RankingSection>
    </MainContainer>
  );
};

export default Rankings;
