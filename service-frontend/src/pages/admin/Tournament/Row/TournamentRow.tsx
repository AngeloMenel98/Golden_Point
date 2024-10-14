import { forwardRef } from "react";
import {
  TourRowContainer,
  LeftContainer,
  RightContainer,
  FullRightContainer,
  MemberContainer,
  TeamsContainer,
  TourName,
  MasterContainer,
  TextSpan,
  StartContainer,
} from "./TournamentRowStyle";
import { mint } from "../../../../utils/colors";
import { TournamentDTO } from "../../../../entities/dtos/TournamentDTO";
import SecondaryButton from "../../../../components/buttons/SecondaryButton/SecondaryButton";
import OptsIcon from "../../../../icons/OptionsIcon/OptsIcon";
import { useNavigate } from "react-router-dom";
import CalCheckIcon from "../../../../icons/CalendarCheckIcon/CalendarCheckIcon";

interface TournamentRowProps {
  tournData: TournamentDTO;
  onOpen: (tournament: TournamentDTO) => void;
}

const TournamentRow = forwardRef<HTMLDivElement, TournamentRowProps>(
  ({ tournData, onOpen }, ref) => {
    const navigate = useNavigate();

    const handleSelectTournament = (tournamentId: string) => {
      navigate(`/matches?tournamentId=${tournamentId}`);
    };

    return (
      <TourRowContainer ref={ref}>
        <LeftContainer>
          <MemberContainer>
            <TourName onClick={() => handleSelectTournament(tournData.Id)}>
              {tournData.Title}
            </TourName>
          </MemberContainer>
        </LeftContainer>
        <RightContainer>
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
            <TextSpan>
              <CalCheckIcon width={15} height={18} status={tournData.Status} />
            </TextSpan>
          </StartContainer>
        </RightContainer>
        <FullRightContainer>
          <SecondaryButton
            icon={
              <OptsIcon
                width={20}
                height={20}
                color={mint}
                onClick={() => onOpen(tournData)}
              />
            }
            onClick={() => onOpen(tournData)}
          />
        </FullRightContainer>
      </TourRowContainer>
    );
  }
);

export default TournamentRow;
