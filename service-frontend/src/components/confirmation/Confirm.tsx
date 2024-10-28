import { useRef } from "react";
import SecondaryButton from "../buttons/SecondaryButton/SecondaryButton";

import {
  ButtonSection,
  Container,
  FooterContainer,
  H4Styled,
  ModalContent,
  ModalWrapper,
  NameSpan,
} from "./ConfirmStyle";
import useClickOutside from "../../hooks/functionalities/useClickOutside";

interface Props {
  name: string;
  onClose: () => void;
  onDelete: () => void;
}

const ConfirmModal: React.FC<Props> = ({ name, onClose, onDelete }) => {
  const handleConfirmDelete = () => {
    onDelete();
    onClose();
  };
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);
  return (
    <ModalWrapper>
      <ModalContent width={20} ref={modalRef}>
        <Container>
          <H4Styled>
            ¿Desea eliminar a <NameSpan>{name}</NameSpan>?
          </H4Styled>
        </Container>
        <FooterContainer>
          <ButtonSection>
            <SecondaryButton
              text="Cancelar"
              isDangerousAction={true}
              onClick={onClose}
            />
          </ButtonSection>
          <ButtonSection>
            <SecondaryButton text="Confirmar" onClick={handleConfirmDelete} />
          </ButtonSection>
        </FooterContainer>
      </ModalContent>
    </ModalWrapper>
  );
};

export default ConfirmModal;
