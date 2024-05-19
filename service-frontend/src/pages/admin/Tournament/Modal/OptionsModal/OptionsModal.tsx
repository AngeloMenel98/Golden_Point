import { ModalWrapper, Container, Icon, Button } from "./OptionsModalStyle";
import PrimaryButton from "../../../../../components/buttons/PrimaryButton/PrimaryButton";

import { pastelGreen, red } from "../../../../../utils/colors";
import React from "react";
import AddIcon from "../../../../../icons/AddIcon/AddIcon";
import TrashIcon from "../../../../../icons/TrashIcon/TrashIcon";

interface OptsModalProps {
  open: boolean;
  width: number;
  onAddTeam: () => void;
  onClose: () => void;
  position: { top: number; right: number };
}

const OptsModal: React.FC<OptsModalProps> = ({
  open,
  width,
  onAddTeam,
  onClose,
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
        <Button hasIcon={true} onClick={onAddTeam}>
          <Icon>
            <AddIcon width={15} height={15} color={pastelGreen} />
          </Icon>
          Añadir Equipo
        </Button>
      </Container>
      <Container>
        <Button hasIcon={true} isDangerous={true}>
          <Icon>
            <TrashIcon width={17} height={17} color={red} />
          </Icon>
          Quitar Equipo
        </Button>
      </Container>
      <Container>
        <PrimaryButton text="Cancelar" isDangerous={true} onClick={onClose} />
      </Container>
    </ModalWrapper>
  );
};

export default OptsModal;
