import { useState } from "react";
import SecondaryInput from "../../../../components/inputs/SecondaryInput/SecondaryInput";
import CrossIcon from "../../../../icons/CrossIcon/CrossIcon";
import { black, red } from "../../../../utils/colors";
import {
  ModalContent,
  ModalWrapper,
  H3Styled,
  HeaderContainer,
  TournamentContainer,
  CategoriesContainer,
  FooterContainer,
  ButtonSection,
} from "./TournamentModalStyle";
import SecondaryButton from "../../../../components/buttons/SecondaryButton/SecondaryButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reduxSlices/store";
import DropDown from "../../../../components/dropdown/DropDown/DropDown";
import DropDownItem from "../../../../components/dropdown/DropDownItem/DropDownItem";
import { TournamentDTO } from "../../../../entities/dtos/TournamentDTO";
import useSeparateCats from "../../../../hooks/useSeparateCats";

interface TournamentModalProps {
  onClose: () => void;
  tournaments: TournamentDTO[];
}

interface CreationData {
  tournamentName: string;
  master: number;
}

const TourModal: React.FC<TournamentModalProps> = ({
  onClose,
  tournaments,
}) => {
  const tourData = useSelector((state: RootState) => state.tour.tour);
  const user = useSelector((state: RootState) => state.user.user);

  /* const { maleCat, femaleCat } = useSeparateCats(
    tournaments.map((t) => t.Categories)
  );*/

  const cats = ["Cuarta", "Quinta", "Sexta", "Septima"];

  const [data, setData] = useState<CreationData>({
    tournamentName: "",
    master: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  return (
    <ModalWrapper>
      <ModalContent width={350} height={370}>
        <HeaderContainer>
          <H3Styled>Crear Torneo</H3Styled>
          <CrossIcon width={30} height={30} color={red} onClick={onClose} />
        </HeaderContainer>
        <TournamentContainer>
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
          <SecondaryInput
            label="Master"
            id="master"
            type="text"
            value={data.master}
            width={50}
            maxLength={4}
            onChange={handleChange}
            //error={fieldErrors.clubName}
          />
        </TournamentContainer>
        <CategoriesContainer>
          <DropDown
            buttonText="Masculino"
            content={
              <>
                {cats.map((cat) => (
                  <DropDownItem key={cat}>{cat}</DropDownItem>
                ))}
              </>
            }
          />
          <DropDown
            buttonText="Femenino"
            content={
              <>
                {cats.map((cat) => (
                  <DropDownItem key={cat}>{cat}</DropDownItem>
                ))}
              </>
            }
          />
        </CategoriesContainer>

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
