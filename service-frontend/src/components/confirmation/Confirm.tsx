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
  return (
    <ModalWrapper>
      <ModalContent width={20}>
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
