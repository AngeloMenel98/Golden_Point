import React, { useEffect, useRef, useState } from "react";
import { ClubDTO } from "../../../../entities/dtos/ClubDTO";
import {
  EditContainer,
  H3,
  HeaderContainer,
  InputContainer,
  ModalContent,
  ModalWrapper,
} from "./EditClubStyle";
import SecondaryInput from "../../../../components/inputs/SecondaryInput/SecondaryInput";
import SecondaryButton from "../../../../components/buttons/SecondaryButton/SecondaryButton";
import useClickOutside from "../../../../hooks/functionalities/useClickOutside";
import CrossIcon from "../../../../icons/CrossIcon/CrossIcon";
import { red } from "../../../../utils/colors";
import { UpdateClub } from "../../../../services/ClubApi";
import { RootState } from "../../../../reduxSlices/store";
import { useSelector } from "react-redux";

interface EditClubProps {
  club: ClubDTO;
  onSave: (updatedClub: UpdateClub) => void;
  onClose: () => void;
}

const EditClub: React.FC<EditClubProps> = ({ club, onSave, onClose }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const [avFrom, setAvFrom] = useState<string>(club.AvFrom);
  const [avTo, setAvTo] = useState<string>(club.AvTo);

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  useEffect(() => {
    setAvFrom(club.AvFrom);
    setAvTo(club.AvTo);
  }, [club]);

  const handleSave = () => {
    const updatedClub: UpdateClub = {
      userId: user?.id,
      clubId: club.Id,
      clubName: club.ClubName,
      location: club.Address,
      avFrom: avFrom,
      avTo: avTo,
    };

    onSave(updatedClub);
    onClose();
  };

  return (
    <ModalWrapper>
      <ModalContent width={35} ref={modalRef}>
        <EditContainer>
          <HeaderContainer>
            <H3>Editar fechas para nuevo Torneo en {club.ClubName}</H3>
            <CrossIcon width={30} height={30} color={red} onClick={onClose} />
          </HeaderContainer>
          <InputContainer>
            <SecondaryInput
              id="avFrom"
              type="datetime-local"
              label="Inicio próximo Torneo"
              value={avFrom}
              isBig={true}
              onChange={(e) => setAvFrom(e.target.value)}
            />
            <SecondaryInput
              id="avTo"
              type="datetime-local"
              label="Fin próximo Torneo"
              value={avTo}
              isBig={true}
              onChange={(e) => setAvTo(e.target.value)}
            />
          </InputContainer>

          <SecondaryButton text="Guardar" onClick={handleSave} />
        </EditContainer>
      </ModalContent>
    </ModalWrapper>
  );
};

export default EditClub;
