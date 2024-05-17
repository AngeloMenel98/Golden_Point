import { useEffect, useState } from "react";
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
import DropDown from "../../../../components/dropdown/DropDown/DropDown";
import { CreationData } from "../Tournament";
import { Errors } from "../../../../errors/Errors";

interface TournamentModalProps {
  data: CreationData;
  onChangeData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onSaveTourn: () => void;
  errors: Errors;
}

interface DropDownData {
  master: number[];
  maleCat: string[];
  femaleCat: string[];
}

const TournamentModal: React.FC<TournamentModalProps> = ({
  data,
  onClose,
  onChangeData,
  onSaveTourn,
  errors,
}) => {
  /* const { maleCat, femaleCat } = useSeparateCats(
    tournaments.map((t) => t.Categories)
  );*/

  const masters = [1000, 1500];
  const cats = ["Cuarta", "Quinta", "Sexta", "Septima", "Octava", "Suma 7"];

  const [dropDownData, setDropDownData] = useState<DropDownData>({
    master: [],
    maleCat: [],
    femaleCat: [],
  });

  useEffect(() => {
    data.maleCat = dropDownData.maleCat;
    data.femaleCat = dropDownData.femaleCat;
  }, [dropDownData]);

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
            onChange={onChangeData}
            error={errors.tournamentName}
          />
          {/*<SecondaryInput
            label="Master"
            id="master"
            type="text"
            value={data.master}
            width={40}
            maxLength={4}
            onChange={onChangeData}
            error={errors.master}
  />*/}
          <DropDown
            buttonText="Master"
            items={masters}
            width={100}
            onChange={(selectedItem: number[]) => {
              setDropDownData({ ...dropDownData, master: selectedItem });
            }}
          />
        </DataContainer>
        <DataContainer>
          <DropDown
            buttonText="Masculino"
            items={cats}
            width={180}
            onChange={(selectedItems: string[]) => {
              setDropDownData({ ...dropDownData, maleCat: selectedItems });
            }}
          />
          <DropDown
            buttonText="Femenino"
            items={cats}
            width={180}
            onChange={(selectedItems: string[]) => {
              setDropDownData({ ...dropDownData, femaleCat: selectedItems });
            }}
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
            <SecondaryButton text="Crear" onClick={onSaveTourn} />
          </ButtonSection>
        </FooterContainer>
      </ModalContent>
    </ModalWrapper>
  );
};

export default TournamentModal;
