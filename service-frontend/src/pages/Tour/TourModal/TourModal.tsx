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
} from "./TourModalStyle";
import { TourFieldErrors } from "../../../errors/TourErrors";
import PlusIcon from "../../../icons/PlusIcon/PlusIcon";
import { User } from "../../../entities/User";
import { ClubDTO } from "../../../entities/dtos/ClubDTO";
import ClubAPI from "../../../services/ClubApi";
import ClubRow from "./ClubRow/ClubRow";

interface TourModalProps {
  onClose: () => void;
  user: User;
}

interface TourData {
  tourName: string;
  clubName: string;
  address: string;
  courts: string;
  avFrom: string;
  avTo: string;
}

const clubAPI = new ClubAPI();

const TourModal: React.FC<TourModalProps> = ({ onClose, user }) => {
  const [tourData, setTourData] = useState<TourData>({
    tourName: "",
    clubName: "",
    address: "",
    courts: "",
    avFrom: "",
    avTo: "",
  });
  const [clubs, setClubs] = useState<ClubDTO[]>([]);
  const [fieldErrors, setFieldErrors] = useState<TourFieldErrors>({});

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

    setClubs(clubArray);
  };

  useEffect(() => {
    getClubs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTourData({ ...tourData, [e.target.id]: e.target.value });
  };

  function handleSaveClub(): void {
    console.log(clubs);
  }

  return (
    <ModalWrapper>
      <ModalContent width={1100} height={500}>
        <HeaderContainer>
          <H3Styled>Crear Tour</H3Styled>
          <CrossIcon width={30} height={30} color={red} onClick={onClose} />
        </HeaderContainer>

        <SecondaryInput
          label="Nombre del Tour"
          id="tourName"
          type="text"
          value={tourData.tourName}
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
            value={tourData.clubName}
            width={120}
            maxLength={20}
            onChange={handleChange}
            error={fieldErrors.clubName}
          />
          <SecondaryInput
            label="Dirección"
            id="address"
            type="text"
            value={tourData.address}
            width={150}
            maxLength={20}
            onChange={handleChange}
            error={fieldErrors.address}
          />
          <SecondaryInput
            label="N° Canchas"
            id="courts"
            type="text"
            value={tourData.courts}
            width={50}
            maxLength={2}
            onChange={handleChange}
            error={fieldErrors.tourName}
          />
          <SecondaryInput
            label="Horario Inicial"
            id="avFrom"
            type="datetime-local"
            value={tourData.avFrom}
            width={250}
            onChange={handleChange}
            error={fieldErrors.avFrom}
          />
          <SecondaryInput
            label="Horario Final"
            id="avTo"
            type="datetime-local"
            value={tourData.avTo}
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
        >
          {clubs.map((club, index) => (
            <ClubRow key={index} clubData={club} user={user} />
          ))}
        </Card>
      </ModalContent>
    </ModalWrapper>
  );
};

export default TourModal;
