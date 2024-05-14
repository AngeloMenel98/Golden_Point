import { useState } from "react";
import {
  TourRowContainer,
  LeftContainer,
  FullRightContainer,
  MemberContainer,
  TeamsContainer,
  TourName,
  CodeContainer,
  TextSpan,
  CreatedBy,
} from "./TournamentRowStyle";
import CopyableText from "../../../../components/copyableText/CopyableText";
import TrashIcon from "../../../../icons/TrashIcon/TrashIcon";
import { red } from "../../../../utils/colors";
import { TournamentDTO } from "../../../../entities/dtos/TournamentDTO";

interface TournamentRowProps {
  tournData: TournamentDTO;
}

const TournamentRow: React.FC<TournamentRowProps> = ({ tournData }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <TourRowContainer
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <LeftContainer>
        <MemberContainer>
          <TourName>{tournData.Title}</TourName>
        </MemberContainer>
        {isShown && (
          <CreatedBy>
            Creado por:
            <CopyableText text="Chau" />
          </CreatedBy>
        )}
        <CodeContainer>
          Master: <TextSpan>{tournData.Master}</TextSpan>
        </CodeContainer>
      </LeftContainer>
      <FullRightContainer>
        <TeamsContainer>
          Equipos: <TextSpan>{tournData.TeamsCount}/24</TextSpan>
        </TeamsContainer>
        {isShown && <TrashIcon width={20} height={20} color={red} />}
      </FullRightContainer>
    </TourRowContainer>
  );
};

export default TournamentRow;
