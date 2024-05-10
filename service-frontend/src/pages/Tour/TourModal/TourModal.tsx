import { useEffect, useState } from "react";
import Card from "../../../components/card/Card";
import SecondaryInput from "../../../components/inputs/SecondaryInput/SecondaryInput";
import CrossIcon from "../../../icons/CrossIcon/CrossIcon";
import {
  black,
  darkGreen,
  pastelGreen,
  red,
  white,
} from "../../../utils/colors";
import {
  ModalContent,
  ModalWrapper,
  H3Styled,
  HeaderContainer,
  ClubContainer,
  FooterContainer,
  ButtonSection,
} from "./TourModalStyle";
import { TourFieldErrors } from "../../../errors/TourErrors";
import PlusIcon from "../../../icons/PlusIcon/PlusIcon";
import { User } from "../../../entities/User";
import { ClubDTO } from "../../../entities/dtos/ClubDTO";
import ClubAPI, { ClubCredentials } from "../../../services/ClubApi";
import ClubRow from "./ClubRow/ClubRow";
import SecondaryButton from "../../../components/buttons/SecondaryButton/SecondaryButton";
import TourAPI, { TourCredentials } from "../../../services/TourApi";

interface TourModalProps {
  onClose: () => void;
  user: User;
  tourApi: TourAPI;
  fieldErrors: TourFieldErrors;
}

interface CreationData {
  tourName: string;
  clubName: string;
  address: string;
  courts: string;
  avFrom: string;
  avTo: string;
}

const clubAPI = new ClubAPI();

const TourModal: React.FC<TourModalProps> = ({
  onClose,
  user,
  tourApi,
  fieldErrors,
}) => {
  const [data, setData] = useState<CreationData>({
    tourName: "",
    clubName: "",
    address: "",
    courts: "",
    avFrom: "",
    avTo: "",
  });
  const [allClubs, setAllClubs] = useState<ClubDTO[]>([]);
  const [clubsSelected, setClubsSelected] = useState<ClubDTO[]>([]);

  useEffect(() => {
    getClubs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleCheckboxChange = (club: ClubDTO, isChecked: boolean) => {
    if (isChecked) {
      setClubsSelected([...clubsSelected, club]);
    } else {
      setClubsSelected(clubsSelected.filter((c) => c !== club));
    }
  };

  const handleSaveClub = async () => {
    const club: ClubCredentials = {
      userId: user.Id,
      clubName: data.clubName,
      address: data.address,
      availableFrom: data.avFrom,
      availableTo: data.avTo,
      courtsNumber: data.courts,
    };

    await clubAPI.addClub(club);
  };

  const handleSaveTour = async () => {
    const tour: TourCredentials = {
      userId: user.Id,
      clubsId: clubsSelected.map((c) => c.Id),
      title: data.tourName,
    };

    await tourApi.addTour(tour);
  };

  const getClubs = async () => {
    const clubArray: ClubDTO[] = [];
    const clubRes = await clubAPI.getClubs();

    clubRes.forEach((c: any) => {
      const club = new ClubDTO();

      club.Id = c.id;
      club.ClubName = c.clubName;
      club.Address = c.address;
      club.CourtCount = c.courtcount;
      club.AvFrom = c.availableFrom;
      club.AvTo = c.availableTo;

      clubArray.push(club);
    });

    setAllClubs(clubArray);
  };

  const filteredClubs = allClubs.filter((club) =>
    club.ClubName.toLowerCase().includes(data.clubName.toLowerCase())
  );

  return (
    <ModalWrapper>
      <ModalContent width={1100} height={520}>
        <HeaderContainer>
          <H3Styled>Crear Tour</H3Styled>
          <CrossIcon width={30} height={30} color={red} onClick={onClose} />
        </HeaderContainer>

        <SecondaryInput
          label="Nombre del Tour"
          id="tourName"
          type="text"
          value={data.tourName}
          width={200}
          maxLength={20}
          onChange={handleChange}
          error={fieldErrors.tourName}
        />

        <ClubContainer>
          <SecondaryInput
            label="Nombre del Club"
            id="clubName"
            type="text"
            value={data.clubName}
            width={120}
            maxLength={20}
            onChange={handleChange}
            error={fieldErrors.clubName}
          />
          <SecondaryInput
            label="Dirección"
            id="address"
            type="text"
            value={data.address}
            width={150}
            maxLength={20}
            onChange={handleChange}
            error={fieldErrors.address}
          />
          <SecondaryInput
            label="N° Canchas"
            id="courts"
            type="text"
            value={data.courts}
            width={50}
            maxLength={2}
            onChange={handleChange}
            error={fieldErrors.courts}
          />
          <SecondaryInput
            label="Horario Inicial"
            id="avFrom"
            type="datetime-local"
            value={data.avFrom}
            width={250}
            onChange={handleChange}
            error={fieldErrors.avFrom}
          />
          <SecondaryInput
            label="Horario Final"
            id="avTo"
            type="datetime-local"
            value={data.avTo}
            width={250}
            onChange={handleChange}
            error={fieldErrors.avTo}
          />
          <PlusIcon
            width={30}
            height={30}
            color={pastelGreen}
            onClick={handleSaveClub}
          />
        </ClubContainer>

        <Card
          bgColor={white}
          borderColor={darkGreen}
          boxColor={black}
          width={1000}
          maxHeight={200}
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
              isDangerous={true}
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
