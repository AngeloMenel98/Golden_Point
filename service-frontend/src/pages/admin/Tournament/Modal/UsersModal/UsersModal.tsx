import { ModalContent, ModalWrapper } from "./UsersModalStyle";

interface UsersModalProps {
  onClose: () => void;
}

const UsersModal: React.FC<UsersModalProps> = ({ onClose }) => {
  return (
    <ModalWrapper>
      <ModalContent width={250} height={250}></ModalContent>
    </ModalWrapper>
  );
};

export default UsersModal;
