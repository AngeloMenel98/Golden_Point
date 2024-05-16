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
import TournamentAPI, {
  DeletedTournament,
} from "../../../../services/TournamentApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reduxSlices/store";

interface TournamentRowProps {
  tournData: TournamentDTO;
  tournApi: TournamentAPI;
}

const TournamentRow: React.FC<TournamentRowProps> = ({
  tournData,
  tournApi,
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const [isShown, setIsShown] = useState(false);

  const deleteTournament = async () => {
    const deleteTourn: DeletedTournament = {
      tournamentId: tournData.Id,
      userId: user?.Id,
    };

    const tournRes = await tournApi.deleteTour(deleteTourn);
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
        {isShown && (
          <TrashIcon
            width={20}
            height={20}
            color={red}
            onClick={deleteTournament}
          />
        )}
      </FullRightContainer>
    </TourRowContainer>
  );
};

export default TournamentRow;
