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
} from "./TournamentRowStyle";
import { darkGreen, mint } from "../../../../utils/colors";
import { TournamentDTO } from "../../../../entities/dtos/TournamentDTO";
import SecondaryButton from "../../../../components/buttons/SecondaryButton/SecondaryButton";
import OptsIcon from "../../../../icons/OptionsIcon/OptsIcon";
import { useNavigate } from "react-router-dom";

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

    console.log(tournData);

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
        <RightContainer>
          <MasterContainer hasStarted={tournData.HasStarted}>
            Master: <TextSpan>{tournData.Master}</TextSpan>
          </MasterContainer>
          <TeamsContainer hasStarted={tournData.HasStarted}>
            Equipos:
            <TextSpan>
              {tournData.TeamsCount}/{tournData.Categories.length * 12}
            </TextSpan>
          </TeamsContainer>
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
