import { User } from "../../../../entities/User";
import {
  ClubRowContainer,
  ClubContainer,
  AddressContainer,
  FullRightContainer,
  LeftContainer,
  HoursContainer,
  ClubName,
  CourtsContainer,
  TextSpan,
} from "./ClubRowStyle";
import { ClubDTO } from "../../../../entities/dtos/ClubDTO";
import { useState } from "react";

interface TourRowProps {
  clubData: ClubDTO;
  user: User;
}

const ClubRow: React.FC<TourRowProps> = ({ user, clubData }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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
      <FullRightContainer>
        <HoursContainer>
          Horario: <TextSpan>{clubData.AvFrom}</TextSpan>
        </HoursContainer>
        <CourtsContainer>
          Canchas: <TextSpan>{clubData.CourtCount}</TextSpan>
        </CourtsContainer>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </FullRightContainer>
    </ClubRowContainer>
  );
};

export default ClubRow;
