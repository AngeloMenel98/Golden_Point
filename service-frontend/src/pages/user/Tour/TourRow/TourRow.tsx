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
import { TourDTO } from "../../../../entities/dtos/TourDTO";
import CopyableText from "../../../../components/copyableText/CopyableText";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTour } from "../../../../reduxSlices/tour/tourSlice";
import { TourData } from "../../../../utils/interfaces";

interface TourRowProps {
  tourData: TourDTO;
}

const TourRow: React.FC<TourRowProps> = ({ tourData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTourClick = () => {
    const tourAsInterface: TourData = {
      id: tourData.Id,
      tourTitle: tourData.TourTitle,
      tourCode: tourData.TourCode,
      userCount: tourData.UserCount,
      tournamentCount: tourData.TournamentCount,
      userOwner: tourData.UserOwner,
    };

    localStorage.setItem("selectedTour", JSON.stringify(tourAsInterface));
    dispatch(setTour(tourAsInterface));
    navigate("/tournaments");
  };

  return (
    <TourRowContainer>
      <LeftContainer>
        <MemberContainer>
          <TourName onClick={handleTourClick}>{tourData.TourTitle}</TourName>
        </MemberContainer>
        <CreatedBy>
          Creado por: <TextSpan>{tourData.UserOwner}</TextSpan>
        </CreatedBy>

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
      </FullRightContainer>
    </TourRowContainer>
  );
};

export default TourRow;
