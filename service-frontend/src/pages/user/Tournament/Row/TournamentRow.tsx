import {
  TourRowContainer,
  LeftContainer,
  FullRightContainer,
  MemberContainer,
  TeamsContainer,
  TourName,
  MasterContainer,
  TextSpan,
} from "./TournamentRowStyle";
import { TournamentDTO } from "../../../../entities/dtos/TournamentDTO";

interface TournamentRowProps {
  tournData: TournamentDTO;
}

const TournamentRow: React.FC<TournamentRowProps> = ({ tournData }) => {
  return (
    <TourRowContainer>
      <LeftContainer>
        <MemberContainer>
          <TourName>{tournData.Title}</TourName>
        </MemberContainer>
      </LeftContainer>
      <FullRightContainer>
        <MasterContainer>
          Master: <TextSpan>{tournData.Master}</TextSpan>
        </MasterContainer>
        <TeamsContainer>
          Equipos:
          <TextSpan>
            {tournData.TeamsCount}/{tournData.Categories.length * 12}
          </TextSpan>
        </TeamsContainer>
      </FullRightContainer>
    </TourRowContainer>
  );
};

export default TournamentRow;
