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
import { mint } from "../../../../utils/colors";
import { TournamentDTO } from "../../../../entities/dtos/TournamentDTO";
import TournamentAPI, {
  DeletedTournament,
} from "../../../../services/TournamentApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reduxSlices/store";
import SecondaryButton from "../../../../components/buttons/SecondaryButton/SecondaryButton";
import OptsIcon from "../../../../icons/OptionsIcon/OptsIcon";
import OptsModal from "../Modal/OptionsModal/OptionsModal";

interface TournamentRowProps {
  tournData: TournamentDTO;
  tournApi: TournamentAPI;
}

const TournamentRow: React.FC<TournamentRowProps> = ({
  tournData,
  tournApi,
}) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const deleteTournament = async () => {
    const deleteTourn: DeletedTournament = {
      tournamentId: tournData.Id,
      userId: user?.Id,
    };

    const tournRes = await tournApi.deleteTournament(deleteTourn);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <TourRowContainer
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <LeftContainer>
        <MemberContainer>
          <TourName>{tournData.Title}</TourName>
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
        {isShown && (
          <SecondaryButton
            icon={
              <OptsIcon
                width={20}
                height={20}
                color={mint}
                onClick={handleOpenModal}
              />
            }
          />
        )}
        {isModalOpen && (
          <OptsModal
            open={isModalOpen}
            width={250}
            onClose={handleCloseModal}
          />
        )}
      </FullRightContainer>
    </TourRowContainer>
  );
};

export default TournamentRow;
