import { forwardRef, useState } from "react";
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
import { mint } from "../../../../utils/colors";
import { TournamentDTO } from "../../../../entities/dtos/TournamentDTO";
import TournamentAPI, {
  DeletedTournament,
} from "../../../../services/TournamentApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reduxSlices/store";
import SecondaryButton from "../../../../components/buttons/SecondaryButton/SecondaryButton";
import OptsIcon from "../../../../icons/OptionsIcon/OptsIcon";
import { useNavigate } from "react-router-dom";

interface TournamentRowProps {
  tournData: TournamentDTO;
  tournApi: TournamentAPI;
  onOpen: () => void;
  onClose: () => void;
}

const TournamentRow = forwardRef<HTMLDivElement, TournamentRowProps>(
  ({ tournData, tournApi, onOpen, onClose }, ref) => {
    const user = useSelector((state: RootState) => state.user.user);

    const [isShown, setIsShown] = useState(false);

    const deleteTournament = async () => {
      const deleteTourn: DeletedTournament = {
        tournamentId: tournData.Id,
        userId: user?.Id,
      };

      const tournRes = await tournApi.deleteTournament(deleteTourn);
    };

    const navigate = useNavigate();

    const handleTourClick = () => {
      navigate("/matches");
    };

    return (
      <TourRowContainer
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        ref={ref}
      >
        <LeftContainer>
          <MemberContainer>
            <TourName onClick={handleTourClick}>{tournData.Title}</TourName>
          </MemberContainer>
          <CodeContainer>
            Master: <TextSpan>{tournData.Master}</TextSpan>
          </CodeContainer>
        </LeftContainer>
        <FullRightContainer>
          <TeamsContainer>
            Equipos:
            <TextSpan>
              {tournData.TeamsCount}/{tournData.Categories.length * 12}
            </TextSpan>
          </TeamsContainer>
          <SecondaryButton
            icon={
              <OptsIcon width={20} height={20} color={mint} onClick={onOpen} />
            }
            onClick={onOpen}
          />
        </FullRightContainer>
      </TourRowContainer>
    );
  }
);

export default TournamentRow;
