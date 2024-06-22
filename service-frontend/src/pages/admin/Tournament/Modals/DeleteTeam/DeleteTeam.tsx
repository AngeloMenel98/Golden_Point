import { useEffect, useState } from "react";
import SecondaryInput from "../../../../../components/inputs/SecondaryInput/SecondaryInput";
import CrossIcon from "../../../../../icons/CrossIcon/CrossIcon";
import SearchIcon from "../../../../../icons/SearchIcon/SearchIcon";
import { darkGreen, red } from "../../../../../utils/colors";
import {
  ButtonsContainer,
  Container,
  H3Styled,
  HeaderContainer,
  ModalContent,
  ModalWrapper,
} from "./DeleteTeamStyle";
import SecondaryButton from "../../../../../components/buttons/SecondaryButton/SecondaryButton";
import TeamsCard from "../../Cards/TeamsCard/TeamsCard";
import useGetTeams from "../../../../../hooks/useGetTeams";
import { TeamDTO } from "../../../../../entities/dtos/TeamDTO";
import { DeletedTeam } from "../../../../../services/TeamApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../reduxSlices/store";

interface DeleteTeamProps {
  tournamentId: string;
  onClose: () => void;
}

const DeleteTeam: React.FC<DeleteTeamProps> = ({ tournamentId, onClose }) => {
  const { allTeams, teamApi } = useGetTeams(tournamentId);

  const user = useSelector((state: RootState) => state.user.user);

  const [fullName, setFullName] = useState<string>("");
  const [teams, setTeams] = useState<TeamDTO[]>([]);

  const handleChange = (e: any) => {
    setFullName(e.target.value);
  };

  const deleteTeam = (team: TeamDTO) => {
    setTeams((prevTeams) => {
      if (prevTeams.includes(team)) {
        return prevTeams.filter((id) => id !== team);
      }
      return [...prevTeams, team];
    });
  };

  const onDeleteTeams = async () => {
    const deletedTeams: DeletedTeam = { teamsId: [], userId: "" };

    teams.forEach((t) => {
      deletedTeams.teamsId.push(t.TeamId);
      deletedTeams.userId = user?.Id;
    });

    const res = await teamApi.deleteTournament(deletedTeams);

    if (res >= 1) {
      onClose();
    } else {
      alert("Error");
    }
  };

  return (
    <ModalWrapper>
      <ModalContent width={40}>
        <HeaderContainer>
          <H3Styled>Equipos</H3Styled>
          <CrossIcon width={30} height={30} color={red} onClick={onClose} />
        </HeaderContainer>
        <SecondaryInput
          id="searchUser"
          type="text"
          value={fullName}
          placeholder="Buscar Equipo"
          icon={<SearchIcon width={27} height={20} color={darkGreen} />}
          onChange={handleChange}
        />
        <Container>
          <TeamsCard
            name={fullName}
            deletedTeams={deleteTeam}
            allTeams={allTeams}
            selectedTeams={teams}
          />
        </Container>

        <Container>
          <ButtonsContainer>
            <SecondaryButton
              text="Cancelar"
              isDangerousAction={true}
              onClick={onClose}
            />
            <SecondaryButton text="Eliminar" onClick={onDeleteTeams} />
          </ButtonsContainer>
        </Container>
      </ModalContent>
    </ModalWrapper>
  );
};

export default DeleteTeam;
