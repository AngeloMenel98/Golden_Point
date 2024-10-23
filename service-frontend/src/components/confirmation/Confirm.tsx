import SecondaryButton from "../buttons/SecondaryButton/SecondaryButton";

import {
  ButtonSection,
  Container,
  FooterContainer,
  H4Styled,
  ModalContent,
  ModalWrapper,
} from "./ConfirmStyle";

interface Props {
  text: string;
  onClose: () => void;
  onDelete: () => void;
}

const ConfirmModal: React.FC<Props> = ({ text, onClose, onDelete }) => {
  return (
    <ModalWrapper>
      <ModalContent width={15}>
        <Container>
          <H4Styled>¿Desea eliminar el {text}?</H4Styled>
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
            <SecondaryButton text="Eliminar" onClick={onDelete} />
          </ButtonSection>
        </FooterContainer>
      </ModalContent>
    </ModalWrapper>
  );
};

export default ConfirmModal;
