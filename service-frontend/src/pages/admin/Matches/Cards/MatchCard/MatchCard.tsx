import { useState } from "react";
import { CardContainer, MatchContainer } from "./MatchCardStyle";
import Card from "../../../../../components/card/Card";
import { darkGreen, pastelGreen, white } from "../../../../../utils/colors";
import Match from "../../../../../components/match/Match";
import EditMatch from "../../Modals/EditMatch/EditMatch";
import { MatchDTO } from "../../../../../entities/dtos/MatchDTO";

interface MatchCardProps {
  matches: MatchDTO[];
  error: string;
}

const MatchCard: React.FC<MatchCardProps> = ({ matches, error }) => {
  const [isMatchOpen, setIsMatchOpen] = useState(false);

  const openMatchModal = () => {
    setIsMatchOpen(true);
  };
  const closeMatchModal = () => {
    setIsMatchOpen(false);
  };

  return (
    <CardContainer>
      <Card
        backgroundCol={white}
        borderCol={darkGreen}
        boxCol={pastelGreen}
        mWidth={1200}
        mHeight={1000}
        error={error}
      >
        {matches.map((match) => (
          <MatchContainer>
            <Match
              key={match.Id}
              onClick={() => openMatchModal()}
              match={match}
            />
          </MatchContainer>
        ))}
      </Card>

      {isMatchOpen && (
        <EditMatch dateMatch="sss" courtMatch="0" onClose={closeMatchModal} />
      )}
    </CardContainer>
  );
};

export default MatchCard;
