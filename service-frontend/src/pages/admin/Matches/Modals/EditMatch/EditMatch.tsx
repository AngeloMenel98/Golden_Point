import { useState } from "react";
import SecondaryInput from "../../../../../components/inputs/SecondaryInput/SecondaryInput";
import CrossIcon from "../../../../../icons/CrossIcon/CrossIcon";
import { pastelGreen, red } from "../../../../../utils/colors";
import {
  ModalContent,
  ModalWrapper,
  H3Styled,
  HeaderContainer,
  FooterContainer,
  ButtonSection,
  DataContainer,
  Span,
  TeamContainer,
  SetContainer,
} from "./EditMatchStyle";
import SecondaryButton from "../../../../../components/buttons/SecondaryButton/SecondaryButton";

import PlusIcon from "../../../../../icons/PlusIcon/PlusIcon";

interface EditMatchProps {
  dateMatch: string;
  courtMatch: string;
  editMatchData: () => void;
  onClose: () => void;
}

interface MatchData {
  date: string;
  court: string;
  set11: string;
  set21: string;
  set31: string;
  set12: string;
  set22: string;
  set32: string;
}

const EditMatch: React.FC<EditMatchProps> = ({
  dateMatch,
  courtMatch,
  editMatchData,
  onClose,
}) => {
  const [matchData, setMatchData] = useState<MatchData>({
    date: dateMatch,
    court: courtMatch,
    set11: "",
    set21: "",
    set31: "",
    set12: "",
    set22: "",
    set32: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMatchData({ ...matchData, [e.target.id]: e.target.value });
  };

  return (
    <ModalWrapper>
      <ModalContent width={50} height={50}>
        <HeaderContainer>
          <H3Styled>Editar Partido</H3Styled>
          <CrossIcon width={25} height={25} color={red} onClick={onClose} />
        </HeaderContainer>
        <DataContainer>
          <SecondaryInput
            id="date"
            type="text"
            label="Fecha"
            value={matchData.date}
            isBig={true}
            onChange={handleChange}
          />
          <SecondaryInput
            id="court"
            type="text"
            label="Cancha"
            value={matchData.court}
            isSmall={true}
            onChange={handleChange}
          />
          <PlusIcon
            width={25}
            height={25}
            color={pastelGreen}
            onClick={editMatchData}
          />
        </DataContainer>
        <DataContainer>
          <H3Styled>Sets:</H3Styled>
          <SetContainer>
            <Span>Set 1</Span>
          </SetContainer>
          <Span>Set 2</Span>
          <Span>Set 3</Span>
        </DataContainer>
        <DataContainer>
          <TeamContainer>
            <Span>Vietto - Parisini</Span>
          </TeamContainer>

          <SecondaryInput
            id="set11"
            type="text"
            value={matchData.set11}
            isSmall={true}
            maxLength={1}
            onChange={handleChange}
          />
          <SecondaryInput
            id="set21"
            type="text"
            value={matchData.set21}
            isSmall={true}
            maxLength={1}
            onChange={handleChange}
          />
          <SecondaryInput
            id="set31"
            type="text"
            value={matchData.set31}
            isSmall={true}
            maxLength={1}
            onChange={handleChange}
          />
        </DataContainer>
        <DataContainer>
          <TeamContainer>
            <Span>Vietto - Parisini</Span>
          </TeamContainer>
          <SecondaryInput
            id="set12"
            type="text"
            value={matchData.set12}
            isSmall={true}
            maxLength={1}
            onChange={handleChange}
          />
          <SecondaryInput
            id="set22"
            type="text"
            value={matchData.set22}
            isSmall={true}
            maxLength={1}
            onChange={handleChange}
          />
          <SecondaryInput
            id="set32"
            type="text"
            value={matchData.set32}
            isSmall={true}
            maxLength={1}
            onChange={handleChange}
          />
        </DataContainer>

        <FooterContainer>
          <ButtonSection></ButtonSection>
          <ButtonSection>
            <SecondaryButton text="Editar" />
          </ButtonSection>
        </FooterContainer>
      </ModalContent>
    </ModalWrapper>
  );
};

export default EditMatch;
