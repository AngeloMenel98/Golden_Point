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
<<<<<<< HEAD
import BouncingCircles from "../../../components/spinner/spinner";
=======
>>>>>>> feature/Brackets
import { Note } from "../../admin/Tour/Cards/TourCardStyle";

const RankingsUser: React.FC = () => {
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
      <NavBar userName={user?.userName} isUser={true} />
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
            <Note>Selecciona una categoría para ver Rankings</Note>
          </TableContainer>
        )}
      </RankingSection>
    </MainContainer>
  );
};

export default RankingsUser;
