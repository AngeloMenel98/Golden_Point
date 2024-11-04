import Card from "../../../../components/card/Card";
import SecondaryInput from "../../../../components/inputs/SecondaryInput/SecondaryInput";
import CrossIcon from "../../../../icons/CrossIcon/CrossIcon";
import {
  black,
  darkGreen,
  pastelGreen,
  red,
  white,
} from "../../../../utils/colors";
import {
  ModalContent,
  ModalWrapper,
  HeaderContainer,
  ClubContainer,
  LeftContainer,
  RightContainer,
  FooterContainer,
  TitleContainer,
  IconContainer,
  TooltipContainer,
  ButtonSection,
  FullRightContainer,
  H3,
  H4,
  TooltipText,
  Note,
} from "./TourModalStyle";
import PlusIcon from "../../../../icons/PlusIcon/PlusIcon";
import { ClubDTO } from "../../../../entities/dtos/ClubDTO";
import ClubRow from "../Rows/ClubRow/ClubRow";
import SecondaryButton from "../../../../components/buttons/SecondaryButton/SecondaryButton";
import useGetClubs from "../../../../hooks/useGetClubs";
import { Errors } from "../../../../errors/Errors";
import { useRef, useState } from "react";
import ClubAPI, { ClubCredentials } from "../../../../services/ClubApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reduxSlices/store";
import TourAPI, { TourCredentials } from "../../../../services/TourApi";
import useClickOutside from "../../../../hooks/functionalities/useClickOutside";
import { CreationTour } from "../../../../utils/interfaces";
import QuestionIcon from "../../../../icons/QuestionIcon/QuestionIcon";
import useIntervals from "../../../../hooks/functionalities/useInterval";

interface TourModalProps {
  tourApi: TourAPI;
  onClose: () => void;
  refetch: () => void;
}

const clubAPI = new ClubAPI();

const TourModal: React.FC<TourModalProps> = ({ tourApi, onClose, refetch }) => {
  const user = useSelector((state: RootState) => state.user.user);

  const { allClubs, addClubToState } = useGetClubs(user?.id, true);

  const [data, setData] = useState<CreationTour>({
    tourName: "",
    clubName: "",
    address: "",
    courts: "",
    avFrom: "",
    avTo: "",
  });
  const [clubsSelected, setClubsSelected] = useState<ClubDTO[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  const intervalCount = useIntervals(
    data.avFrom,
    data.avTo,
    parseInt(data.courts)
  );

  const handleSaveClub = async () => {
    setFieldErrors({});
    const club: ClubCredentials = {
      userId: user?.id,
      clubName: data.clubName,
      address: data.address,
      availableFrom: data.avFrom,
      availableTo: data.avTo,
      courtsNumber: data.courts,
    };

    setData({
      tourName: "",
      clubName: "",
      address: "",
      courts: "",
      avFrom: "",
      avTo: "",
    });

    const res = await clubAPI.addClub(club);

    if (res.fieldErrors) {
      setFieldErrors((prevErrors: any) => ({
        ...prevErrors,
        ...res.fieldErrors,
      }));
    } else {
      const newClub: ClubDTO = new ClubDTO();
      newClub.Id = res.id;
      newClub.ClubName = res.clubName;
      newClub.Address = res.address;
      newClub.AvFrom = data.avFrom;
      newClub.AvTo = data.avTo;
      newClub.CourtCount = Number(data.courts);

      addClubToState(newClub);
    }
  };

  const handleSaveTour = async () => {
    setFieldErrors({});
    const tour: TourCredentials = {
      userId: user?.id,
      clubsId: clubsSelected.map((c) => c.Id),
      title: data.tourName,
    };

    const res = await tourApi.addTour(tour);

    if (res.fieldErrors) {
      setFieldErrors((prevErrors: any) => ({
        ...prevErrors,
        ...res.fieldErrors,
      }));
    } else {
      onClose();
      refetch();
    }
  };

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleCheckboxChange = (club: ClubDTO, isChecked: boolean) => {
    if (isChecked) {
      setClubsSelected((prevSelected) => [...prevSelected, club]);
    } else {
      setClubsSelected((prevSelected) =>
        prevSelected.filter((c) => c.Id !== club.Id)
      );
    }
  };

  const filteredClubs = allClubs.filter((club) =>
    club.ClubName.toLowerCase().includes(data.clubName.toLowerCase())
  );

  return (
    <ModalWrapper>
      <ModalContent width={45} ref={modalRef}>
        <HeaderContainer>
          <H3>Crear Tour</H3>
          <CrossIcon width={30} height={30} color={red} onClick={onClose} />
        </HeaderContainer>

        <SecondaryInput
          label="Nombre del Tour"
          id="tourName"
          type="text"
          value={data.tourName}
          maxLength={20}
          onChange={handleData}
          error={fieldErrors.tourName}
        />

        <ClubContainer>
          <LeftContainer>
            <SecondaryInput
              label="Nombre del Club"
              id="clubName"
              type="text"
              value={data.clubName}
              maxLength={20}
              onChange={handleData}
              error={fieldErrors.clubName}
            />
            <SecondaryInput
              label="Dirección"
              id="address"
              type="text"
              value={data.address}
              maxLength={20}
              onChange={handleData}
              error={fieldErrors.address}
            />
            <SecondaryInput
              label="N° Canchas"
              id="courts"
              type="text"
              value={data.courts}
              maxLength={2}
              isSmall={true}
              onChange={handleData}
              error={fieldErrors.courts}
            />
          </LeftContainer>

          <RightContainer>
            <TitleContainer>
              <H4>Disponibilidad del Club para Torneo</H4>
              <TooltipContainer>
                <IconContainer>
                  <QuestionIcon width={15} height={15} color={darkGreen} />
                </IconContainer>
                <TooltipText className="tooltip">
                  Fechas para primer Torneo del Club. Modificar en Clubs dentro
                  de un Tour para próximos Torneos.
                </TooltipText>
              </TooltipContainer>
            </TitleContainer>
            <SecondaryInput
              label="Inicio"
              id="avFrom"
              type="datetime-local"
              value={data.avFrom}
              isBig={true}
              onChange={handleData}
              error={fieldErrors.avFrom}
            />
            <SecondaryInput
              label="Final"
              id="avTo"
              type="datetime-local"
              value={data.avTo}
              isBig={true}
              onChange={handleData}
              error={fieldErrors.avTo}
            />
            {intervalCount !== null && data.courts !== "" && (
              <Note>*Partidos disponibles: {intervalCount}</Note>
            )}
          </RightContainer>
          <FullRightContainer>
            <PlusIcon
              width={30}
              height={30}
              color={pastelGreen}
              onClick={handleSaveClub}
            />
          </FullRightContainer>
        </ClubContainer>

        <Card
          backgroundCol={white}
          borderCol={darkGreen}
          boxCol={black}
          mWidth={1000}
          mHeight={110}
        >
          {filteredClubs.map((club, index) => (
            <ClubRow
              key={index}
              clubData={club}
              onCheckboxChange={handleCheckboxChange}
              isChecked={clubsSelected.some(
                (selectedClub) => selectedClub.Id === club.Id
              )}
            />
          ))}
          {filteredClubs.length === 0 && <Note>No hay ningún Club</Note>}
        </Card>

        <FooterContainer>
          <ButtonSection>
            <SecondaryButton
              text="Cancelar"
              isDangerousAction={true}
              onClick={onClose}
            />
          </ButtonSection>
          <ButtonSection>
            <SecondaryButton text="Crear" onClick={handleSaveTour} />
          </ButtonSection>
        </FooterContainer>
      </ModalContent>
    </ModalWrapper>
  );
};

export default TourModal;
