import { useState } from "react";
import {
  TourRowContainer,
  LeftContainer,
  FullRightContainer,
  MemberContainer,
  UserContainer,
  TournamentContainer,
  TourName,
  CodeContainer,
  TextSpan,
} from "./TourRowStyle";
import { Tour } from "../../../entities/Tour";
import CopyableText from "../../../components/copyableText/CopyableText";
import TrashIcon from "../../../icons/TrashIcon/TrashIcon";
import { red } from "../../../utils/colors";

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
          <TourName to="/tournament">{tourData.TourTitle}</TourName>
        </MemberContainer>
        {isShown && <div>Created by: {tourData.Id}</div>}
        <CodeContainer>
          Código del Tour: <CopyableText text={tourData.TourCode} />
        </CodeContainer>
      </LeftContainer>
      <FullRightContainer>
        <UserContainer>
          Usuarios: <TextSpan>{tourData.UserCount}</TextSpan>
        </UserContainer>
        <TournamentContainer>
          Torneos: <TextSpan>{tourData.TournamentCount}</TextSpan>
        </TournamentContainer>
        <TrashIcon width={20} height={20} color={red} />
      </FullRightContainer>
    </TourRowContainer>
  );
};

export default TourRow;
