import { useEffect, useState } from "react";
import SecondaryInput from "../../../../../components/inputs/SecondaryInput/SecondaryInput";
import CrossIcon from "../../../../../icons/CrossIcon/CrossIcon";
import { red } from "../../../../../utils/colors";
import {
  ModalContent,
  ModalWrapper,
  H3Styled,
  HeaderContainer,
  FooterContainer,
  ButtonSection,
  DataContainer,
} from "./TournamentModalStyle";
import SecondaryButton from "../../../../../components/buttons/SecondaryButton/SecondaryButton";
import DropDown from "../../../../../components/dropdown/DropDown/DropDown";
import { CreationData } from "../../Tournament";
import { Errors } from "../../../../../errors/Errors";

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
  const cats = ["Cuarta", "Quinta", "Sexta", "Septima", "Octava", "Suma 7"];

  const masters = [1000, 1500];

  const [dropDownData, setDropDownData] = useState<DropDownData>({
    master: [],
    maleCat: [],
    femaleCat: [],
  });

  useEffect(() => {
    data.master = dropDownData.master[0];
    data.maleCat = dropDownData.maleCat;
    data.femaleCat = dropDownData.femaleCat;
  }, [dropDownData]);

  return (
    <ModalWrapper>
      <ModalContent width={25}>
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
            maxLength={20}
            onChange={onChangeData}
            error={errors.tournamentName}
          />
          <DropDown
            buttonText="Master"
            items={masters}
            width={100}
            onChange={(selectedItem: number[]) => {
              setDropDownData({ ...dropDownData, master: selectedItem });
            }}
            error={errors.master}
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
            error={errors.categories}
          />
          <DropDown
            buttonText="Femenino"
            items={cats}
            width={180}
            onChange={(selectedItems: string[]) => {
              setDropDownData({ ...dropDownData, femaleCat: selectedItems });
            }}
            error={errors.categories}
          />
        </DataContainer>

        <FooterContainer>
          <ButtonSection>
            <SecondaryButton
              text="Cancelar"
              isDangerousAction={true}
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
