import { forwardRef, useState } from "react";
import {
  TourRowContainer,
  LeftContainer,
  RightContainer,
  FullRightContainer,
  MemberContainer,
  TeamsContainer,
  TourName,
  MasterContainer,
  TextSpan,
} from "./TournamentRowStyle";
import { mint } from "../../../../utils/colors";
import { TournamentDTO } from "../../../../entities/dtos/TournamentDTO";
import SecondaryButton from "../../../../components/buttons/SecondaryButton/SecondaryButton";
import OptsIcon from "../../../../icons/OptionsIcon/OptsIcon";
import { useNavigate } from "react-router-dom";

interface TournamentRowProps {
  tournData: TournamentDTO;
  onOpen: (tournament: TournamentDTO) => void;
}

const TournamentRow = forwardRef<HTMLDivElement, TournamentRowProps>(
  ({ tournData, onOpen }, ref) => {
    const [isShown, setIsShown] = useState(false);

    const navigate = useNavigate();

    const handleTourClick = () => {
      navigate("/matches");
    };

    return (
      <TourRowContainer
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        ref={ref}
      >
        <LeftContainer>
          <MemberContainer>
            <TourName onClick={handleTourClick}>{tournData.Title}</TourName>
          </MemberContainer>
        </LeftContainer>
        <RightContainer>
          <MasterContainer>
            Master: <TextSpan>{tournData.Master}</TextSpan>
          </MasterContainer>
          <TeamsContainer>
            Equipos:
            <TextSpan>
              {tournData.TeamsCount}/{tournData.Categories.length * 12}
            </TextSpan>
          </TeamsContainer>
        </RightContainer>
        <FullRightContainer>
          <SecondaryButton
            icon={
              <OptsIcon
                width={20}
                height={20}
                color={mint}
                onClick={() => onOpen(tournData)}
              />
            }
            onClick={() => onOpen(tournData)}
          />
        </FullRightContainer>
      </TourRowContainer>
    );
  }
);

export default TournamentRow;
