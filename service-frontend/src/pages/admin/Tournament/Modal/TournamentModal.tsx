import { useEffect, useState } from "react";
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
} from "./TournamentModalStyle";
import PlusIcon from "../../../../icons/PlusIcon/PlusIcon";
import SecondaryButton from "../../../../components/buttons/SecondaryButton/SecondaryButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reduxSlices/store";

interface TournamentModalProps {
  onClose: () => void;
}

interface CreationData {
  tournamentName: string;
  master: number;
}

const TourModal: React.FC<TournamentModalProps> = ({ onClose }) => {
  const tourData = useSelector((state: RootState) => state.tour.tour);

  const [data, setData] = useState<CreationData>({
    tournamentName: "",
    master: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  return (
    <ModalWrapper>
      <ModalContent width={500} height={520}>
        <HeaderContainer>
          <H3Styled>Crear Torneo</H3Styled>
          <CrossIcon width={30} height={30} color={red} onClick={onClose} />
        </HeaderContainer>

        <SecondaryInput
          label="Nombre del Torneo"
          id="tournamentName"
          type="text"
          value={data.tournamentName}
          width={200}
          maxLength={20}
          onChange={handleChange}
          // error={fieldErrors.tourName}
        />

        <ClubContainer>
          <SecondaryInput
            label="Master"
            id="master"
            type="text"
            value={data.master}
            width={120}
            maxLength={20}
            onChange={handleChange}
            //error={fieldErrors.clubName}
          />
        </ClubContainer>

        <FooterContainer>
          <ButtonSection>
            <SecondaryButton
              text="Cancelar"
              isDangerous={true}
              onClick={onClose}
            />
          </ButtonSection>
          <ButtonSection>
            <SecondaryButton text="Crear" />
          </ButtonSection>
        </FooterContainer>
      </ModalContent>
    </ModalWrapper>
  );
};

export default TourModal;
