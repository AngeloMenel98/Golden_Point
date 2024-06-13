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

interface UsersModalProps {
  tourId: string | undefined;
  isAddTeam: boolean;
  onClose: () => void;
}

const UsersModal: React.FC<UsersModalProps> = ({
  tourId,
  isAddTeam,
  onClose,
}) => {
  const { users, userAPI, errorUsers } = useGetUsers(tourId);

  const [fullName, setFullName] = useState<string>("");

  const handleChange = (e: any) => {
    setFullName(e.target.value);
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
          <UsersCard name={fullName} users={users} error={errorUsers} />
        </Container>
        {isAddTeam ? (
          <Container>
            <ButtonsContainer>
              <SecondaryButton
                text="Cancelar"
                isDangerousAction={true}
                onClick={onClose}
              />
              <SecondaryButton text="Guardar" onClick={onClose} />
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
