import { useState } from "react";
import SearchIcon from "../../../icons/SearchIcon/SearchIcon";
import {
  FullRightContainer,
  TourName,
  LeftContainer,
  MemberContainer,
  TourRowContainer,
  CodeContainer,
} from "./TourRowStyle";
import { Tour } from "../../../entities/Tour";

interface TourRowProps {
  tourData: Tour;
}

const TourRow: React.FC<TourRowProps> = ({ tourData }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <TourRowContainer
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <LeftContainer>
        <MemberContainer>
          <TourName>{tourData.TourTitle}</TourName>
        </MemberContainer>
        <CodeContainer>Código del Tour: {tourData.TourCode}</CodeContainer>
      </LeftContainer>
      <FullRightContainer>
        <CodeContainer>UserCount: {tourData.UserCount}</CodeContainer>
        <CodeContainer>
          TournamentCount: {tourData.TournamentCount}
        </CodeContainer>
        <SearchIcon width={50} height={50} />
      </FullRightContainer>
    </TourRowContainer>
  );
};

export default TourRow;
