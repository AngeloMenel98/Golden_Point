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
import { TourDTO } from "../../../../entities/dtos/TourDTO";
import CopyableText from "../../../../components/copyableText/CopyableText";
import TourAPI from "../../../../services/TourApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reduxSlices/store";
import { useDispatch } from "react-redux";
import { setTour } from "../../../../reduxSlices/tour/tourSlice";

interface TourRowProps {
  tourData: TourDTO;
  tourApi: TourAPI;
}

const TourRow: React.FC<TourRowProps> = ({ tourData, tourApi }) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [isShown, setIsShown] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTourClick = () => {
    dispatch(setTour(tourData));
    navigate("/tournaments");
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
      </FullRightContainer>
    </TourRowContainer>
  );
};

export default TourRow;
