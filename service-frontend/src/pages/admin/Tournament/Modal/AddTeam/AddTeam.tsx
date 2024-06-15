import { useEffect, useState } from "react";
import SecondaryInput from "../../../../../components/inputs/SecondaryInput/SecondaryInput";
import CrossIcon from "../../../../../icons/CrossIcon/CrossIcon";
import { red } from "../../../../../utils/colors";

import {
  SpaceContainer,
  H3Styled,
  HeaderContainer,
  ModalContent,
  ModalWrapper,
} from "./AddTeamStyle";
import SecondaryButton from "../../../../../components/buttons/SecondaryButton/SecondaryButton";
import { UserDTO } from "../../../../../entities/dtos/UserDTO";
import DropDown from "../../../../../components/dropdown/DropDown/DropDown";
import TeamAPI, { TeamCredentials } from "../../../../../services/TeamApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../reduxSlices/store";

interface AddTeamProps {
  players: UserDTO[];
  onClose: () => void;
}

interface DropDownData {
  maleCat: string[];
  femaleCat: string[];
}

const AddTeamModal: React.FC<AddTeamProps> = ({ players, onClose }) => {
  const user = useSelector((state: RootState) => state.tour.tour);
  const [teamName, setTeamName] = useState<string>("");

  const cats = ["Cuarta", "Quinta", "Sexta", "Septima", "Octava", "Suma 7"];

  const [dropDownData, setDropDownData] = useState<DropDownData>({
    maleCat: [],
    femaleCat: [],
  });

  useEffect(() => {
    setTeamName(players.map((p) => p.LastName).join(" - "));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };

  const addTeam = async () => {
    /*const categories: Category[] = [];
    dropDownData.maleCat.forEach((category) => {
      categories.push({
        gender: "Masculino",
        categoryName: category,
      });
    });

    dropDownData.femaleCat.forEach((category) => {
      categories.push({
        gender: "Femenino",
        categoryName: category,
      });
    });

    const team: TeamCredentials = {
     adminUserId: user?.Id,
     tournamentId: ,
     category: categories[0].gender + categories[0].categoryName ,
     usersId: players.map(p => p.Id),
   };
  
   const res = await teamApi.addTeam(team);*/
  };

  return (
    <ModalWrapper>
      <ModalContent width={40}>
        <HeaderContainer>
          <H3Styled>Usuarios</H3Styled>
          <CrossIcon width={30} height={30} color={red} onClick={onClose} />
        </HeaderContainer>
        <SecondaryInput
          id="teamName"
          type="text"
          label="Nombre del Equipo:"
          value={teamName}
          onChange={handleChange}
        />
        <SpaceContainer id="space">
          <DropDown
            buttonText="Masculino"
            items={cats}
            width={150}
            onChange={(selectedItems: string[]) => {
              setDropDownData({ ...dropDownData, maleCat: selectedItems });
            }}
            error={undefined}
          />
          <DropDown
            buttonText="Femenino"
            items={cats}
            width={150}
            onChange={(selectedItems: string[]) => {
              setDropDownData({
                ...dropDownData,
                femaleCat: selectedItems,
              });
            }}
            error={undefined}
          />
        </SpaceContainer>

        <SpaceContainer>
          <SecondaryButton
            text="Cancelar"
            isDangerousAction={true}
            onClick={onClose}
          />
          <SecondaryButton text="Agregar" onClick={addTeam} />
        </SpaceContainer>
      </ModalContent>
    </ModalWrapper>
  );
};

export default AddTeamModal;
