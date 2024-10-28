import { forwardRef, useState } from "react";
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
  IconContainer,
} from "./TournamentRowStyle";
import { mint, red } from "../../../../utils/colors";
import { TournamentDTO } from "../../../../entities/dtos/TournamentDTO";
import SecondaryButton from "../../../../components/buttons/SecondaryButton/SecondaryButton";
import OptsIcon from "../../../../icons/OptionsIcon/OptsIcon";
import { useNavigate } from "react-router-dom";
import { getTournamentStatus } from "../../../../utils/status";
import TrashIcon from "../../../../icons/TrashIcon/TrashIcon";
import ConfirmModal from "../../../../components/confirmation/Confirm";

interface TournamentRowProps {
  tournData: TournamentDTO;
  onOpen: (tournament: TournamentDTO) => void;
  onDelete: (tourn: TournamentDTO) => void;
}

const TournamentRow = forwardRef<HTMLDivElement, TournamentRowProps>(
  ({ tournData, onOpen, onDelete }, ref) => {
    const navigate = useNavigate();

    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

    const handleSelectTournament = (tournamentId: string) => {
      navigate(`/matches?tournamentId=${tournamentId}`);
    };

    const openModal = () => {
      setIsDeleteOpen(true);
    };

    const closeModal = () => {
      setIsDeleteOpen(false);
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
            <TextSpan>{getTournamentStatus(tournData.Status)}</TextSpan>
          </StartContainer>
        </RightContainer>
        <FullRightContainer>
          <IconContainer>
            <TrashIcon width={20} height={20} color={red} onClick={openModal} />
          </IconContainer>
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

        {isDeleteOpen && (
          <ConfirmModal
            name={tournData.Title}
            onClose={closeModal}
            onDelete={() => onDelete(tournData)}
          />
        )}
      </TourRowContainer>
    );
  }
);

export default TournamentRow;
