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
} from "./TournamentRowStyle";
import { TournamentDTO } from "../../../../entities/dtos/TournamentDTO";
import { useNavigate } from "react-router-dom";

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
      <TourRowContainer ref={ref} hasStarted={tournData.HasStarted}>
        <LeftContainer>
          <MemberContainer>
            <TourName
              onClick={() => handleSelectTournament(tournData.Id)}
              hasStarted={tournData.HasStarted}
            >
              {tournData.Title}
            </TourName>
          </MemberContainer>
        </LeftContainer>
        <FullRightContainer>
          <MasterContainer hasStarted={tournData.HasStarted}>
            Master: <TextSpan>{tournData.Master}</TextSpan>
          </MasterContainer>
          <TeamsContainer hasStarted={tournData.HasStarted}>
            Equipos:
            <TextSpan>
              {tournData.TeamsCount}/{tournData.Categories.length * 12}
            </TextSpan>
          </TeamsContainer>
        </FullRightContainer>
      </TourRowContainer>
    );
  }
);

export default TournamentRow;
