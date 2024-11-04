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
import { useEffect, useState } from "react";
import Checkbox from "../../../../../components/checkbox/Checkbox";
import { formatDateTime } from "../../../../../utils/transformDate";

interface ClubRowProps {
  clubData: ClubDTO;
  onCheckboxChange: (club: ClubDTO, isChecked: boolean) => void;
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
          Fecha: <TextSpan>{formatDateTime(clubData.AvFrom)}</TextSpan>
        </HoursContainer>
        <CourtsContainer>
          Canchas: <TextSpan>{clubData.CourtCount}</TextSpan>
        </CourtsContainer>
      </RightContainer>
      <FullRightContainer>
        <Checkbox checked={localChecked} onChange={handleCheckboxChange} />
      </FullRightContainer>
    </ClubRowContainer>
  );
};

export default ClubRow;
