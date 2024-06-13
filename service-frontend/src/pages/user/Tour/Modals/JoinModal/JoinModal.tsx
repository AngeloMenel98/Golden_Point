import SecondaryInput from "../../../../../components/inputs/SecondaryInput/SecondaryInput";
import { ModalWrapper, Container, ButtonContainer } from "./JoinModalStyle";
import PrimaryButton from "../../../../../components/buttons/PrimaryButton/PrimaryButton";
import { Errors } from "../../../../../errors/Errors";

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
  return (
    <ModalWrapper open={open} width={width}>
      <Container>
        <SecondaryInput
          id="code"
          type="text"
          label="Código del Tour"
          value={code}
          maxLength={20}
          placeholder="Código"
          onChange={onJoinCode}
          error={error?.tourCode}
        />
      </Container>
      <Container>
        <ButtonContainer>
          <PrimaryButton
            text="Cancelar"
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
