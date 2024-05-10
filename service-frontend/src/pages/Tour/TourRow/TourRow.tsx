import { useState } from "react";
import {
  TourRowContainer,
  LeftContainer,
  FullRightContainer,
  MemberContainer,
  UserContainer,
  TournamentContainer,
  TourName,
  CodeContainer,
  TextSpan,
  CreatedBy,
} from "./TourRowStyle";
import { TourDTO } from "../../../entities/dtos/TourDTO";
import CopyableText from "../../../components/copyableText/CopyableText";
import TrashIcon from "../../../icons/TrashIcon/TrashIcon";
import { red } from "../../../utils/colors";
import TourAPI, { DeletedTour } from "../../../services/TourApi";
import { User } from "../../../entities/User";
import { useNavigate } from "react-router-dom";

interface TourRowProps {
  tourData: TourDTO;
  tourApi: TourAPI;
  user: User;
}

const TourRow: React.FC<TourRowProps> = ({ tourData, tourApi, user }) => {
  const [isShown, setIsShown] = useState(false);

  const handleDeleteTour = async () => {
    const deleteTour: DeletedTour = {
      tourId: tourData.Id,
      userId: user.Id,
    };

    const tourRes = await tourApi.deleteTour(deleteTour);
    //window.location.reload();
  };

  const navigate = useNavigate();
  const handleTourClick = () => {
    navigate("/tournaments", { state: { tourData, user } });
  };

  return (
    <TourRowContainer
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <LeftContainer>
        <MemberContainer>
          <TourName onClick={handleTourClick}>{tourData.TourTitle}</TourName>
        </MemberContainer>
        {isShown && (
          <CreatedBy>
            Creado por: <TextSpan>{tourData.UserOwner}</TextSpan>
          </CreatedBy>
        )}
        <CodeContainer>
          Código del Tour: <CopyableText text={tourData.TourCode} />
        </CodeContainer>
      </LeftContainer>
      <FullRightContainer>
        <UserContainer>
          Usuarios: <TextSpan>{tourData.UserCount}</TextSpan>
        </UserContainer>
        <TournamentContainer>
          Torneos: <TextSpan>{tourData.TournamentCount}</TextSpan>
        </TournamentContainer>
        {isShown && (
          <TrashIcon
            width={20}
            height={20}
            color={red}
            onClick={handleDeleteTour}
          />
        )}
      </FullRightContainer>
    </TourRowContainer>
  );
};

export default TourRow;
