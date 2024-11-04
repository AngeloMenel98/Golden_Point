import {
  ClubRowContainer,
  ClubContainer,
  AddressContainer,
  RightContainer,
  LeftContainer,
  FullRightContainer,
  HoursContainer,
  ClubName,
  CourtsContainer,
  TextSpan,
} from "./ClubRowStyle";
import { ClubDTO } from "../../../../../entities/dtos/ClubDTO";
<<<<<<< HEAD
import { useState } from "react";
=======
import { useEffect, useState } from "react";
>>>>>>> develop
import Checkbox from "../../../../../components/checkbox/Checkbox";
import { formatDateTime } from "../../../../../utils/transformDate";

interface ClubRowProps {
  clubData: ClubDTO;
  onCheckboxChange: (club: ClubDTO, isChecked: boolean) => void;
<<<<<<< HEAD
}

const ClubRow: React.FC<ClubRowProps> = ({ clubData, onCheckboxChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onCheckboxChange(clubData, !isChecked);
  };

=======
  isChecked: boolean;
}

const ClubRow: React.FC<ClubRowProps> = ({
  clubData,
  onCheckboxChange,
  isChecked,
}) => {
  const [localChecked, setLocalChecked] = useState(isChecked);

  useEffect(() => {
    setLocalChecked(isChecked);
  }, [isChecked]);

  const handleCheckboxChange = (newChecked: boolean) => {
    setLocalChecked(newChecked); // Actualiza el estado local
    onCheckboxChange(clubData, newChecked); // Llama a la función del padre
  };
>>>>>>> develop
  return (
    <ClubRowContainer>
      <LeftContainer>
        <ClubContainer>
          <ClubName>{clubData.ClubName}</ClubName>
        </ClubContainer>
        <AddressContainer>
          Dirección:<TextSpan>{clubData.Address}</TextSpan>
        </AddressContainer>
      </LeftContainer>
      <RightContainer>
        <HoursContainer>
<<<<<<< HEAD
          Horario: <TextSpan>{formatDateTime(clubData.AvFrom)}</TextSpan>
=======
          Fecha: <TextSpan>{formatDateTime(clubData.AvFrom)}</TextSpan>
>>>>>>> develop
        </HoursContainer>
        <CourtsContainer>
          Canchas: <TextSpan>{clubData.CourtCount}</TextSpan>
        </CourtsContainer>
      </RightContainer>
      <FullRightContainer>
<<<<<<< HEAD
        <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
=======
        <Checkbox checked={localChecked} onChange={handleCheckboxChange} />
>>>>>>> develop
      </FullRightContainer>
    </ClubRowContainer>
  );
};

export default ClubRow;
