import { useState } from "react";
import SecondaryInput from "../../../../../components/inputs/SecondaryInput/SecondaryInput";
import CrossIcon from "../../../../../icons/CrossIcon/CrossIcon";
import SearchIcon from "../../../../../icons/SearchIcon/SearchIcon";
import { darkGreen, red } from "../../../../../utils/colors";
import UsersCard from "../../Card/UsersCard/UsersCard";
import {
  Container,
  H3Styled,
  HeaderContainer,
  ModalContent,
  ModalWrapper,
  ButtonsContainer,
} from "./UsersModalStyle";
import useGetUsers from "../../../../../hooks/useGetUsers";
import SecondaryButton from "../../../../../components/buttons/SecondaryButton/SecondaryButton";
import { UserDTO } from "../../../../../entities/dtos/UserDTO";

interface UsersModalProps {
  tourId: string | undefined;
  isAddTeam: boolean;
  onClose: () => void;
  onNext: () => void;
}

const UsersModal: React.FC<UsersModalProps> = ({
  tourId,
  isAddTeam,
  onClose,
  onNext,
}) => {
  const { users, userAPI, errorUsers } = useGetUsers(tourId);

  const [fullName, setFullName] = useState<string>("");
  const [players, setPlayers] = useState<UserDTO[]>([]);

  const handleChange = (e: any) => {
    setFullName(e.target.value);
  };

  const addPlayer = (player: UserDTO) => {
    setPlayers((prevPlayers) => {
      if (prevPlayers.includes(player)) {
        return prevPlayers.filter((id) => id !== player);
      }
      if (prevPlayers.length >= 2) {
        return prevPlayers;
      }
      return [...prevPlayers, player];
    });
  };

  return (
    <ModalWrapper>
      <ModalContent width={40}>
        <HeaderContainer>
          <H3Styled>Usuarios</H3Styled>
          <CrossIcon width={30} height={30} color={red} onClick={onClose} />
        </HeaderContainer>
        <SecondaryInput
          id="searchUser"
          type="text"
          value={fullName}
          placeholder="Buscar Usuario"
          icon={<SearchIcon width={27} height={20} color={darkGreen} />}
          onChange={handleChange}
        />
        <H3Styled>Jugadores: {players.length}/2</H3Styled>
        <Container>
          <UsersCard
            name={fullName}
            users={users}
            error={errorUsers}
            addPlayers={addPlayer}
            selectedPlayers={players}
          />
        </Container>
        {isAddTeam ? (
          <Container>
            <ButtonsContainer>
              <SecondaryButton
                text="Cancelar"
                isDangerousAction={true}
                onClick={onClose}
              />
              <SecondaryButton text="Siguiente" onClick={onNext} />
            </ButtonsContainer>
          </Container>
        ) : (
          <></>
        )}
      </ModalContent>
    </ModalWrapper>
  );
};

export default UsersModal;
