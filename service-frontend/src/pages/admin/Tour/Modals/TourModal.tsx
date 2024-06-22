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
  H3Styled,
  HeaderContainer,
  ClubContainer,
  LeftContainer,
  RightContainer,
  FooterContainer,
  ButtonSection,
  FullRightContainer,
} from "./TourModalStyle";
import PlusIcon from "../../../../icons/PlusIcon/PlusIcon";
import { ClubDTO } from "../../../../entities/dtos/ClubDTO";
import ClubRow from "../Rows/ClubRow/ClubRow";
import SecondaryButton from "../../../../components/buttons/SecondaryButton/SecondaryButton";
import { CreationData } from "../Tours";
import useGetClubs from "../../../../hooks/useGetClubs";
import { Errors } from "../../../../errors/Errors";
import { useState } from "react";
import ClubAPI, { ClubCredentials } from "../../../../services/ClubApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reduxSlices/store";
import TourAPI, { TourCredentials } from "../../../../services/TourApi";
import { TourDTO } from "../../../../entities/dtos/TourDTO";

interface TourModalProps {
  tourApi: TourAPI;
  onClose: () => void;
}

const clubAPI = new ClubAPI();

const TourModal: React.FC<TourModalProps> = ({ tourApi, onClose }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const allClubs = useGetClubs();

  const [data, setData] = useState<CreationData>({
    tourName: "",
    clubName: "",
    address: "",
    courts: "",
    avFrom: "",
    avTo: "",
  });
  const [clubsSelected, setClubsSelected] = useState<ClubDTO[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const handleSaveClub = async () => {
    setFieldErrors({});
    const club: ClubCredentials = {
      userId: user?.Id,
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
    }
  };

  const handleSaveTour = async () => {
    setFieldErrors({});
    const tour: TourCredentials = {
      userId: user?.Id,
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
    }
  };

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleCheckboxChange = (club: ClubDTO, isChecked: boolean) => {
    if (isChecked) {
      setClubsSelected([...clubsSelected, club]);
    } else {
      setClubsSelected(clubsSelected.filter((c) => c !== club));
    }
  };

  const filteredClubs = allClubs.filter((club) =>
    club.ClubName.toLowerCase().includes(data.clubName.toLowerCase())
  );

  return (
    <ModalWrapper>
      <ModalContent width={45}>
        <HeaderContainer>
          <H3Styled>Crear Tour</H3Styled>
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
            <SecondaryInput
              label="Horario Inicial"
              id="avFrom"
              type="datetime-local"
              value={data.avFrom}
              isBig={true}
              onChange={handleData}
              error={fieldErrors.avFrom}
            />
            <SecondaryInput
              label="Horario Final"
              id="avTo"
              type="datetime-local"
              value={data.avTo}
              isBig={true}
              onChange={handleData}
              error={fieldErrors.avTo}
            />
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
          mHeight={800}
          error={fieldErrors.notFound}
        >
          {filteredClubs.map((club, index) => (
            <ClubRow
              key={index}
              clubData={club}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
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
