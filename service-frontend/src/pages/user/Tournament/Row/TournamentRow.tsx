import { forwardRef } from "react";

import {
  TourRowContainer,
  LeftContainer,
  MemberContainer,
  TeamsContainer,
  TourName,
  MasterContainer,
  TextSpan,
  FullRightContainer,
  StartContainer,
} from "./TournamentRowStyle";
import { TournamentDTO } from "../../../../entities/dtos/TournamentDTO";
import { useNavigate } from "react-router-dom";
import { getTournamentStatus } from "../../../../utils/status";

interface TournamentRowProps {
  tournData: TournamentDTO;
}

const TournamentRow = forwardRef<HTMLDivElement, TournamentRowProps>(
  ({ tournData }, ref) => {
    const navigate = useNavigate();

    const handleSelectTournament = (tournamentId: string) => {
      navigate(`/matches?tournamentId=${tournamentId}`);
    };

    return (
      <TourRowContainer ref={ref}>
        <LeftContainer>
          <MemberContainer>
            <TourName
              onClick={() => handleSelectTournament(tournData.Id)}
              disabled={tournData.Status == "pending"}
            >
              {tournData.Title}
            </TourName>
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
          <StartContainer>
            Estado:
            <TextSpan>{getTournamentStatus(tournData.Status)}</TextSpan>
          </StartContainer>
        </FullRightContainer>
      </TourRowContainer>
    );
  }
);

export default TournamentRow;
