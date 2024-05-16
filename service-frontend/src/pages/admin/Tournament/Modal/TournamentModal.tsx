import { useState } from "react";
import SecondaryInput from "../../../../components/inputs/SecondaryInput/SecondaryInput";
import CrossIcon from "../../../../icons/CrossIcon/CrossIcon";
import { red } from "../../../../utils/colors";
import {
  ModalContent,
  ModalWrapper,
  H3Styled,
  HeaderContainer,
  FooterContainer,
  ButtonSection,
  DataContainer,
} from "./TournamentModalStyle";
import SecondaryButton from "../../../../components/buttons/SecondaryButton/SecondaryButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reduxSlices/store";
import DropDown from "../../../../components/dropdown/DropDown/DropDown";
import { Category } from "../../../../entities/dtos/TournamentDTO";
import TournamentAPI, {
  TournCredentials,
} from "../../../../services/TournamentApi";

interface TournamentModalProps {
  onClose: () => void;
  tournApi: TournamentAPI;
}

interface CreationData {
  tournamentName: string;
  master: number;
  maleCat: string[];
  femaleCat: string[];
}

const TournamentModal: React.FC<TournamentModalProps> = ({
  onClose,
  tournApi,
}) => {
  const tourData = useSelector((state: RootState) => state.tour.tour);
  const user = useSelector((state: RootState) => state.user.user);

  /* const { maleCat, femaleCat } = useSeparateCats(
    tournaments.map((t) => t.Categories)
  );*/

  const cats = ["Cuarta", "Quinta", "Sexta", "Septima", "Octava", "Suma 7"];

  const [data, setData] = useState<CreationData>({
    tournamentName: "",
    master: 0,
    maleCat: [],
    femaleCat: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSaveTournament = async () => {
    const categories: Category[] = [];

    data.maleCat.forEach((category) => {
      categories.push({
        gender: "Masculino",
        categoryName: category,
      });
    });

    data.femaleCat.forEach((category) => {
      categories.push({
        gender: "Femenino",
        categoryName: category,
      });
    });

    const tournament: TournCredentials = {
      userId: user?.Id,
      tourId: tourData?.Id,
      title: data.tournamentName,
      master: data.master,
      categories: categories,
    };

    await tournApi.addTournament(tournament);
  };

  return (
    <ModalWrapper>
      <ModalContent width={400} height={400}>
        <HeaderContainer>
          <H3Styled>Crear Torneo</H3Styled>
          <CrossIcon width={30} height={30} color={red} onClick={onClose} />
        </HeaderContainer>
        <DataContainer>
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
            width={40}
            maxLength={4}
            onChange={handleChange}
            //error={fieldErrors.clubName}
          />
        </DataContainer>
        <DataContainer>
          <DropDown
            buttonText="Masculino"
            items={cats}
            width={180}
            onChange={(selectedItems) =>
              setData({ ...data, maleCat: selectedItems })
            }
          />
          <DropDown
            buttonText="Femenino"
            items={cats}
            width={180}
            onChange={(selectedItems) =>
              setData({ ...data, femaleCat: selectedItems })
            }
          />
        </DataContainer>

        <FooterContainer>
          <ButtonSection>
            <SecondaryButton
              text="Cancelar"
              isDangerous={true}
              onClick={onClose}
            />
          </ButtonSection>
          <ButtonSection>
            <SecondaryButton text="Crear" onClick={handleSaveTournament} />
          </ButtonSection>
        </FooterContainer>
      </ModalContent>
    </ModalWrapper>
  );
};

export default TournamentModal;
