import React from "react";
import Card from "../../../../components/card/Card";
import { darkGreen, pastelGreen, white } from "../../../../utils/colors";
import { CardContainer } from "./TournamentStyle";
import TournamentRow from "../Row/TournamentRow";
import { TournamentDTO } from "../../../../entities/dtos/TournamentDTO";

interface TournamentCardProps {
  tournaments: TournamentDTO[];
  tournamentTitle: string;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  tournaments,
  tournamentTitle,
}) => {
  const filteredTourns = tournaments.filter((tourn) =>
    tourn.Title.toLowerCase().includes(tournamentTitle.toLowerCase())
  );
  return (
    <CardContainer>
      <Card
        bgColor={white}
        borderColor={darkGreen}
        boxColor={pastelGreen}
        width={1200}
      >
        {filteredTourns.map((tourn, index) => (
          <TournamentRow key={index} tournData={tourn} />
        ))}
      </Card>
    </CardContainer>
  );
};

export default TournamentCard;
