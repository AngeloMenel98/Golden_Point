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
import { MatchData } from "../../Cards/MatchCard/MatchCard";
import SetAPI, { SetAtts } from "../../../../../services/SetApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../reduxSlices/store";
import MatchAPI, { MatchCred } from "../../../../../services/MatchApi";
import { useState } from "react";
import { Errors } from "../../../../../errors/Errors";
import { parseDateTime } from "../../../../../utils/transformDate";

interface EditMatchProps {
  editMatch: MatchData;
  onEditMatch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  reloadMatches: () => void;
}

const setAPI: SetAPI = new SetAPI();
const matchAPI: MatchAPI = new MatchAPI();

const EditMatch: React.FC<EditMatchProps> = ({
  editMatch,
  onEditMatch,
  onClose,
  reloadMatches,
}) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const handleSets = async () => {
    let setT1 = [];
    let setT2 = [];
    if (editMatch.set31 == null && editMatch.set32 == null) {
      setT1 = [editMatch.set11, editMatch.set21];
      setT2 = [editMatch.set12, editMatch.set22];
    } else {
      setT1 = [editMatch.set11, editMatch.set21, editMatch.set31];
      setT2 = [editMatch.set12, editMatch.set22, editMatch.set32];
    }

    const newSets: SetAtts = {
      userId: user?.Id,
      setsTeam1: setT1,
      setsTeam2: setT2,
      teamsId: editMatch.teamsId.map((t) => t),
      matchId: editMatch.matchId,
    };

    const res = await setAPI.addSets(newSets);

    if (res != null) {
      onClose();
      reloadMatches();
    }
  };

  const editMatchData = async () => {
    setFieldErrors({});
    const updateMatch: MatchCred = {
      matchId: editMatch.matchId,
      clubId: editMatch.clubId,
      matchDate: parseDateTime(editMatch.date),
      courtNumber: editMatch.court,
    };

    const res = await matchAPI.updateMatch(updateMatch);

    if (res.fieldErrors) {
      setFieldErrors((prevErrors: any) => ({
        ...prevErrors,
        ...res.fieldErrors,
      }));
    } else {
      onClose();
      reloadMatches();
    }
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
            value={editMatch.date}
            isBig={true}
            onChange={onEditMatch}
          />
          <SecondaryInput
            id="court"
            type="text"
            label="Cancha"
            value={editMatch.court}
            isSmall={true}
            error={fieldErrors.general}
            onChange={onEditMatch}
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
            <Span>{editMatch.teamsName[0]}</Span>
          </TeamContainer>

          <SecondaryInput
            id="set11"
            type="text"
            value={editMatch.set11}
            isSmall={true}
            maxLength={1}
            onChange={onEditMatch}
          />
          <SecondaryInput
            id="set21"
            type="text"
            value={editMatch.set21}
            isSmall={true}
            maxLength={1}
            onChange={onEditMatch}
          />
          <SecondaryInput
            id="set31"
            type="text"
            value={editMatch.set31}
            isSmall={true}
            maxLength={1}
            onChange={onEditMatch}
          />
        </DataContainer>
        <DataContainer>
          <TeamContainer>
            <Span>{editMatch.teamsName[1]}</Span>
          </TeamContainer>
          <SecondaryInput
            id="set12"
            type="text"
            value={editMatch.set12}
            isSmall={true}
            maxLength={1}
            onChange={onEditMatch}
          />
          <SecondaryInput
            id="set22"
            type="text"
            value={editMatch.set22}
            isSmall={true}
            maxLength={1}
            onChange={onEditMatch}
          />
          <SecondaryInput
            id="set32"
            type="text"
            value={editMatch.set32}
            isSmall={true}
            maxLength={1}
            onChange={onEditMatch}
          />
        </DataContainer>

        <FooterContainer>
          <ButtonSection></ButtonSection>
          <ButtonSection>
            <SecondaryButton text="Agregar" onClick={handleSets} />
          </ButtonSection>
        </FooterContainer>
      </ModalContent>
    </ModalWrapper>
  );
};

export default EditMatch;
