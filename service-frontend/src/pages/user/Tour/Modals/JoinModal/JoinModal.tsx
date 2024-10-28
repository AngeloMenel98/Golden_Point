import SecondaryInput from "../../../../../components/inputs/SecondaryInput/SecondaryInput";
import { ModalWrapper, Container, ButtonContainer } from "./JoinModalStyle";
import PrimaryButton from "../../../../../components/buttons/PrimaryButton/PrimaryButton";
import { Errors } from "../../../../../errors/Errors";
import { useRef } from "react";
import useClickOutside from "../../../../../hooks/functionalities/useClickOutside";

interface JoinModalProps {
  open: boolean;
  width: number;
  code: string;
  error: Errors | undefined;
  onJoin: () => void;
  onClose: () => void;
  onJoinCode: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const JoinModal: React.FC<JoinModalProps> = ({
  open,
  width,
  code,
  error,
  onJoin,
  onClose,
  onJoinCode,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  return (
    <ModalWrapper open={open} width={width} ref={modalRef}>
      <Container>
        <SecondaryInput
          id="code"
          type="text"
          label="Código del Tour"
          value={code}
          maxLength={20}
          placeholder="Código"
          onChange={onJoinCode}
          error={error?.tourCode || error?.userJoined}
        />
      </Container>
      <Container>
        <ButtonContainer>
          <PrimaryButton
            text="Cerrar"
            isDangerousAction={true}
            onClick={onClose}
          />
        </ButtonContainer>
        <PrimaryButton text="Unirse" onClick={onJoin} />
      </Container>
    </ModalWrapper>
  );
};

export default JoinModal;
