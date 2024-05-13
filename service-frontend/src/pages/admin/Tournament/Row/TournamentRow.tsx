import { useDebugValue, useState } from "react";
import {
  TourRowContainer,
  LeftContainer,
  FullRightContainer,
  MemberContainer,
  UserContainer,
  TournamentContainer,
  TourName,
  CodeContainer,
  TextSpan,
  CreatedBy,
} from "./TournamentRowStyle";
import CopyableText from "../../../../components/copyableText/CopyableText";
import TrashIcon from "../../../../icons/TrashIcon/TrashIcon";
import { red } from "../../../../utils/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reduxSlices/store";
interface TourRowProps {}

const TournamentRow: React.FC<TourRowProps> = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const [isShown, setIsShown] = useState(false);

  return (
    <TourRowContainer
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <LeftContainer>
        <MemberContainer>
          <TourName>Chau</TourName>
        </MemberContainer>
        {isShown && (
          <CreatedBy>
            Creado por: <TextSpan>Hola</TextSpan>
          </CreatedBy>
        )}
        <CodeContainer>
          Código del Tour: <CopyableText text="Chau" />
        </CodeContainer>
      </LeftContainer>
      <FullRightContainer>
        <UserContainer>
          Usuarios: <TextSpan>chau</TextSpan>
        </UserContainer>
        <TournamentContainer>
          Torneos: <TextSpan>Chau</TextSpan>
        </TournamentContainer>
        {isShown && <TrashIcon width={20} height={20} color={red} />}
      </FullRightContainer>
    </TourRowContainer>
  );
};

export default TournamentRow;
