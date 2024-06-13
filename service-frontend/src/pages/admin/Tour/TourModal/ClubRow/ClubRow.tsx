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
import { useState } from "react";
import Checkbox from "../../../../../components/checkbox/Checkbox";

interface ClubRowProps {
  clubData: ClubDTO;
  onCheckboxChange: (club: ClubDTO, isChecked: boolean) => void;
}

const ClubRow: React.FC<ClubRowProps> = ({ clubData, onCheckboxChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onCheckboxChange(clubData, !isChecked);
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
          Horario: <TextSpan>{clubData.AvFrom}</TextSpan>
        </HoursContainer>
        <CourtsContainer>
          Canchas: <TextSpan>{clubData.CourtCount}</TextSpan>
        </CourtsContainer>
      </RightContainer>
      <FullRightContainer>
        <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
      </FullRightContainer>
    </ClubRowContainer>
  );
};

export default ClubRow;
