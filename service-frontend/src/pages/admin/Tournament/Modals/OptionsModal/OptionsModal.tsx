import React from "react";
import { ModalWrapper, Container, MyButton, MyIcon } from "./OptionsModalStyle";
import PrimaryButton from "../../../../../components/buttons/PrimaryButton/PrimaryButton";
import AddIcon from "../../../../../icons/AddIcon/AddIcon";
import TrashIcon from "../../../../../icons/TrashIcon/TrashIcon";
import { pastelGreen, red } from "../../../../../utils/colors";
import CheckIcon from "../../../../../icons/CheckIcon/CheckIcon";

interface OptsModalProps {
  open: boolean;
  width: number;
  onAddTeam: () => void;
  onDeleteTeam: () => void;
  onStartTournament: () => void;
  onClose: () => void;
  isActive: string;
  position: { top: number; right: number };
}

const OptsModal: React.FC<OptsModalProps> = ({
  open,
  width,
  onAddTeam,
  onDeleteTeam,
  onStartTournament,
  onClose,
  isActive,
  position,
}) => {
  return (
    <ModalWrapper
      open={open}
      width={width}
      top={position.top}
      right={position.right}
    >
      <Container>
        <MyButton hasIcon={true} onClick={onAddTeam}>
          <MyIcon>
            <AddIcon width={15} height={15} color={pastelGreen} />
          </MyIcon>
          Añadir Equipo
        </MyButton>
      </Container>
      <Container>
        <MyButton hasIcon={true} isDangerous={true} onClick={onDeleteTeam}>
          <MyIcon>
            <TrashIcon width={17} height={17} color={red} />
          </MyIcon>
          Quitar Equipos
        </MyButton>
      </Container>
      <Container>
        <MyButton
          hasIcon={true}
          onClick={onStartTournament}
          disabled={isActive === "inProgress"}
        >
          <MyIcon>
            <CheckIcon width={17} height={17} color={pastelGreen} />
          </MyIcon>
          Iniciar Torneo
        </MyButton>
      </Container>
      <Container>
        <PrimaryButton
          text="Cancelar"
          isDangerousAction={true}
          onClick={onClose}
        />
      </Container>
    </ModalWrapper>
  );
};

export default OptsModal;
