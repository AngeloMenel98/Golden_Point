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
import {
  Category,
  TournamentDTO,
} from "../../../../../entities/dtos/TournamentDTO";
import useSeparateCats from "../../../../../hooks/useSeparateCats";

interface AddTeamProps {
  players: UserDTO[];
  tournament: TournamentDTO;
  onClose: () => void;
}

interface DropDownData {
  maleCat: string[];
  femaleCat: string[];
}

const teamApi = new TeamAPI();

const AddTeamModal: React.FC<AddTeamProps> = ({
  players,
  tournament,
  onClose,
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const [teamName, setTeamName] = useState<string>("");

  const { maleCat, femaleCat } = useSeparateCats(tournament.Categories);

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
    const categories: Category[] = [];
    dropDownData.maleCat.forEach((category) => {
      categories.push({
        gender: "Masculino",
        category: category,
      });
    });

    dropDownData.femaleCat.forEach((category) => {
      categories.push({
        gender: "Femenino",
        category: category,
      });
    });

    const team: TeamCredentials = {
      adminUserId: user?.Id,
      tournamentId: tournament.Id,
      category: categories[0].gender + "-" + categories[0].category,
      usersId: players.map((p) => p.Id),
    };

    const res = await teamApi.addTeam(team);

    if (res != null) {
      tournament.TeamsCount += 1;
      onClose();
    } else {
      alert("Error");
    }
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
        <SpaceContainer>
          <DropDown
            buttonText="Masculino"
            items={maleCat}
            width={150}
            onChange={(selectedItems: string[]) => {
              setDropDownData({ ...dropDownData, maleCat: selectedItems });
            }}
            error={""}
          />
          <DropDown
            buttonText="Femenino"
            items={femaleCat}
            width={150}
            onChange={(selectedItems: string[]) => {
              setDropDownData({
                ...dropDownData,
                femaleCat: selectedItems,
              });
            }}
            error={""}
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
