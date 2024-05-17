import { ModalWrapper, Container, ButtonContainer } from "./OptionsModalStyle";
import PrimaryButton from "../../../../../components/buttons/PrimaryButton/PrimaryButton";

interface OptsModalProps {
  open: boolean;
  width: number;
  onClose: () => void;
}

const OptsModal: React.FC<OptsModalProps> = ({ open, width, onClose }) => {
  return (
    <ModalWrapper open={open} width={width}>
      <Container>
        <PrimaryButton text="Cancelar" isDangerous={true} onClick={onClose} />
      </Container>
    </ModalWrapper>
  );
};

export default OptsModal;
