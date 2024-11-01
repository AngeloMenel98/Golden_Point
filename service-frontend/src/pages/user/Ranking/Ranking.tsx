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
import DropDownUnique from "../../../components/dropdown/DropDownSingle/DropDown/DropDown";
import Breadcrumb from "../../../components/breadcrumb/BreadCrumb";
import useGetRankings from "../../../hooks/useGetRankings";
import BouncingCircles from "../../../components/spinner/spinner";
<<<<<<< HEAD

const Rankings: React.FC = () => {
=======
import { Note } from "../../admin/Tour/Cards/TourCardStyle";

const RankingsUser: React.FC = () => {
>>>>>>> develop
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
<<<<<<< HEAD
      <NavBar userName={user?.userName} />
=======
      <NavBar userName={user?.userName} isUser={true} />
>>>>>>> develop
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
<<<<<<< HEAD
            <BouncingCircles text="categoría" />
=======
            <Note>Selecciona una categoría para ver Rankings</Note>
>>>>>>> develop
          </TableContainer>
        )}
      </RankingSection>
    </MainContainer>
  );
};

<<<<<<< HEAD
export default Rankings;
=======
export default RankingsUser;
>>>>>>> develop
