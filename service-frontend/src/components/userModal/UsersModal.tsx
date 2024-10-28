import { useEffect, useRef, useState } from "react";
import SecondaryInput from "../inputs/SecondaryInput/SecondaryInput";
import CrossIcon from "../../icons/CrossIcon/CrossIcon";
import SearchIcon from "../../icons/SearchIcon/SearchIcon";
import { darkGreen, red } from "../../utils/colors";
import UsersCard from "../../pages/admin/Tournament/Cards/UsersCard/UsersCard";
import {
  Container,
  HeaderContainer,
  ModalContent,
  ModalWrapper,
  ButtonsContainer,
  H3Styled,
  H4Styled,
  UserContainer,
} from "./UsersModalStyle";
import useGetUsers from "../../hooks/useGetUsers";
import SecondaryButton from "../buttons/SecondaryButton/SecondaryButton";
import { UserDTO } from "../../entities/dtos/UserDTO";
import useClickOutside from "../../hooks/functionalities/useClickOutside";

interface UsersModalProps {
  tourId: string | undefined;
  isAddTeam: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPlayersChange?: (players: UserDTO[]) => void;
}

const UsersModal: React.FC<UsersModalProps> = ({
  tourId,
  isAddTeam,
  onClose,
  onNext,
  onPlayersChange,
}) => {
  const { users, errorUsers } = useGetUsers(tourId);

  const [fullName, setFullName] = useState<string>("");
  const [players, setPlayers] = useState<UserDTO[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  useEffect(() => {
    if (onPlayersChange) {
      onPlayersChange(players);
    }
  }, [players, onPlayersChange]);

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
      <ModalContent width={40} ref={modalRef}>
        <HeaderContainer>
          {isAddTeam ? (
            <H3Styled>Selecciona usuarios para un equipo</H3Styled>
          ) : (
            <H3Styled>Usuarios</H3Styled>
          )}
          <CrossIcon width={30} height={30} color={red} onClick={onClose} />
        </HeaderContainer>
        <UserContainer>
          <SecondaryInput
            id="searchUser"
            type="text"
            value={fullName}
            placeholder="Buscar Usuario"
            icon={<SearchIcon width={27} height={20} color={darkGreen} />}
            onChange={handleChange}
          />
          {isAddTeam && <H4Styled>Jugadores: {players.length}/2</H4Styled>}
        </UserContainer>
        <Container>
          <UsersCard
            name={fullName}
            users={users}
            error={errorUsers}
            addPlayers={addPlayer}
            selectedPlayers={players}
          />
        </Container>
        {isAddTeam && (
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
        )}
      </ModalContent>
    </ModalWrapper>
  );
};

export default UsersModal;
