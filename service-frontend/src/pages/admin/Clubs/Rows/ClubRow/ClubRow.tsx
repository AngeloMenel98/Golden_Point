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
import { formatDateTime } from "../../../../../utils/transformDate";

interface ClubRowProps {
  clubData: ClubDTO;
}

const ClubRow: React.FC<ClubRowProps> = ({ clubData }) => {
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
          Horario: <TextSpan>{formatDateTime(clubData.AvFrom)}</TextSpan>
        </HoursContainer>
        <CourtsContainer>
          Canchas: <TextSpan>{clubData.CourtCount}</TextSpan>
        </CourtsContainer>
      </RightContainer>
      <FullRightContainer></FullRightContainer>
    </ClubRowContainer>
  );
};

export default ClubRow;
