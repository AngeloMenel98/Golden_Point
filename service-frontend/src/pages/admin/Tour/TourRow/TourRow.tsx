import {
  CodeContainer,
  CreatedBy,
  RightContainer,
  LeftContainer,
  MemberContainer,
  MiddleContainer,
  TextSpan,
  TourName,
  TourRowContainer,
  TournamentContainer,
  UserContainer,
} from "./TourRowStyle";
import { TourDTO } from "../../../../entities/dtos/TourDTO";
import CopyableText from "../../../../components/copyableText/CopyableText";
import TrashIcon from "../../../../icons/TrashIcon/TrashIcon";
import { red } from "../../../../utils/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTour } from "../../../../reduxSlices/tour/tourSlice";

interface TourRowProps {
  tourData: TourDTO;
  onDelete: () => void;
}

const TourRow: React.FC<TourRowProps> = ({ tourData, onDelete }) => {
  /*const user = useSelector((state: RootState) => state.user.user);

  const handleDeleteTour = async () => {
    const deleteTour: DeletedTour = {
      tourId: tourData.Id,
      userId: user?.Id,
    };

    const tourRes = await tourApi.deleteTour(deleteTour);
  };*/

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTourClick = () => {
    dispatch(setTour(tourData));
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
      <MiddleContainer>
        <UserContainer>
          Usuarios: <TextSpan>{tourData.UserCount}</TextSpan>
        </UserContainer>
        <TournamentContainer>
          Torneos: <TextSpan>{tourData.TournamentCount}</TextSpan>
        </TournamentContainer>
      </MiddleContainer>

      <RightContainer>
        <TrashIcon width={20} height={20} color={red} onClick={onDelete} />
      </RightContainer>
    </TourRowContainer>
  );
};

export default TourRow;
