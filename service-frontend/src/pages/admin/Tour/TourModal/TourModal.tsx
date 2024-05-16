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
  FooterContainer,
  ButtonSection,
} from "./TourModalStyle";
import { TourFieldErrors } from "../../../../errors/TourErrors";
import PlusIcon from "../../../../icons/PlusIcon/PlusIcon";
import { ClubDTO } from "../../../../entities/dtos/ClubDTO";
import ClubRow from "./ClubRow/ClubRow";
import SecondaryButton from "../../../../components/buttons/SecondaryButton/SecondaryButton";
import { CreationData } from "../Tours";
import useGetClubs from "../../../../hooks/useGetClubs";

interface TourModalProps {
  data: CreationData;
  saveClubs: () => void;
  saveTour: () => void;
  onCheckBox: (club: ClubDTO, isChecked: boolean) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  errors: TourFieldErrors;
}

const TourModal: React.FC<TourModalProps> = ({
  data,
  saveClubs,
  saveTour,
  onCheckBox,
  onChange,
  onClose,
  errors,
}) => {
  const allClubs = useGetClubs();

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
          onChange={onChange}
          error={errors.tourName}
        />

        <ClubContainer>
          <SecondaryInput
            label="Nombre del Club"
            id="clubName"
            type="text"
            value={data.clubName}
            width={120}
            maxLength={20}
            onChange={onChange}
            error={errors.clubName}
          />
          <SecondaryInput
            label="Dirección"
            id="address"
            type="text"
            value={data.address}
            width={150}
            maxLength={20}
            onChange={onChange}
            error={errors.address}
          />
          <SecondaryInput
            label="N° Canchas"
            id="courts"
            type="text"
            value={data.courts}
            width={50}
            maxLength={2}
            onChange={onChange}
            error={errors.courts}
          />
          <SecondaryInput
            label="Horario Inicial"
            id="avFrom"
            type="datetime-local"
            value={data.avFrom}
            width={250}
            onChange={onChange}
            error={errors.avFrom}
          />
          <SecondaryInput
            label="Horario Final"
            id="avTo"
            type="datetime-local"
            value={data.avTo}
            width={250}
            onChange={onChange}
            error={errors.avTo}
          />
          <PlusIcon
            width={30}
            height={30}
            color={pastelGreen}
            onClick={saveClubs}
          />
        </ClubContainer>

        <Card
          bgColor={white}
          borderColor={darkGreen}
          boxColor={black}
          width={1000}
          maxHeight={200}
          errors={errors}
        >
          {filteredClubs.map((club, index) => (
            <ClubRow
              key={index}
              clubData={club}
              onCheckboxChange={onCheckBox}
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
            <SecondaryButton text="Crear" onClick={saveTour} />
          </ButtonSection>
        </FooterContainer>
      </ModalContent>
    </ModalWrapper>
  );
};

export default TourModal;
