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
import { useState } from "react";
import ConfirmModal from "../../../../components/confirmation/Confirm";
import { TourData } from "../../../../utils/interfaces";

interface TourRowProps {
  tourData: TourDTO;
  onDelete: () => void;
}

const TourRow: React.FC<TourRowProps> = ({ tourData, onDelete }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

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

  const openModal = () => {
    setIsDeleteOpen(true);
  };

  const closeModal = () => {
    setIsDeleteOpen(false);
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
        <TrashIcon width={20} height={20} color={red} onClick={openModal} />
      </RightContainer>

      {isDeleteOpen && (
        <ConfirmModal
          name={tourData.TourTitle}
          onClose={closeModal}
          onDelete={onDelete}
        />
      )}
    </TourRowContainer>
  );
};

export default TourRow;
