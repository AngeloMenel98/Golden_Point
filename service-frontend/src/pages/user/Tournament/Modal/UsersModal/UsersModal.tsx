import { useState } from "react";
import SecondaryInput from "../../../../../components/inputs/SecondaryInput/SecondaryInput";
import CrossIcon from "../../../../../icons/CrossIcon/CrossIcon";
import SearchIcon from "../../../../../icons/SearchIcon/SearchIcon";
import { darkGreen, red } from "../../../../../utils/colors";
import {
  Container,
  H3Styled,
  HeaderContainer,
  ModalContent,
  ModalWrapper,
} from "./UsersModalStyle";
import useGetUsers from "../../../../../hooks/useGetUsers";
import { UserDTO } from "../../../../../entities/dtos/UserDTO";
import UsersCard from "../../Card/UsersCard/UsersCard";

interface UsersModalProps {
  tourId: string | undefined;
  onClose: () => void;
}

const UsersModal: React.FC<UsersModalProps> = ({ tourId, onClose }) => {
  const { users, errorUsers } = useGetUsers(tourId);

  const [fullName, setFullName] = useState<string>("");
  const [playerId, setPlayerId] = useState<string>("");

  const handleChange = (e: any) => {
    setFullName(e.target.value);
  };

  const addPlayer = (player: UserDTO) => {
    setPlayerId((prevId) => (prevId === player.Id ? "" : player.Id));
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
        <Container>
          <UsersCard
            name={fullName}
            users={users}
            error={errorUsers}
            addPlayer={addPlayer}
            selectedPlayerId={playerId}
          />
        </Container>
      </ModalContent>
    </ModalWrapper>
  );
};

export default UsersModal;
