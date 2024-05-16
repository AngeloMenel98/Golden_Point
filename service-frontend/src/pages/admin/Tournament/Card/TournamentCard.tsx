import React from "react";
import Card from "../../../../components/card/Card";
import { darkGreen, pastelGreen, white } from "../../../../utils/colors";
import { CardContainer } from "./TournamentStyle";
import TournamentRow from "../Row/TournamentRow";
import { TournamentDTO } from "../../../../entities/dtos/TournamentDTO";
import TournamentAPI from "../../../../services/TournamentApi";

interface TournamentCardProps {
  tournaments: TournamentDTO[];
  tournamentTitle: string;
  tournApi: TournamentAPI;
  error: string;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  tournaments,
  tournamentTitle,
  tournApi,
  error,
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
        error={error}
      >
        {filteredTourns.map((tourn, index) => (
          <TournamentRow key={index} tournData={tourn} tournApi={tournApi} />
        ))}
      </Card>
    </CardContainer>
  );
};

export default TournamentCard;
