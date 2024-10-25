import React from "react";
import Card from "../../../../components/card/Card";
import { darkGreen, pastelGreen, white } from "../../../../utils/colors";
import { CardContainer } from "./TournamentStyle";
import TournamentRow from "../Row/TournamentRow";
import { TournamentDTO } from "../../../../entities/dtos/TournamentDTO";
import BouncingCircles from "../../../../components/spinner/spinner";

interface TournamentCardProps {
  tournaments: TournamentDTO[];
  tournamentTitle: string;
  error: string | undefined;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  tournaments,
  tournamentTitle,
  error,
}) => {
  const filteredTourns = tournaments.filter((tourn) =>
    tourn.Title.toLowerCase().includes(tournamentTitle.toLowerCase())
  );
  return (
    <CardContainer>
      <Card
        backgroundCol={white}
        borderCol={darkGreen}
        boxCol={pastelGreen}
        mWidth={1200}
        mHeight={500}
      >
        {error && <BouncingCircles text="la creación de un Torneo" />}
        {filteredTourns.map((tourn, index) => (
          <TournamentRow key={index} tournData={tourn} />
        ))}
        {filteredTourns.length === 0 && (
          <BouncingCircles text="nuevos Torneos" />
        )}
      </Card>
    </CardContainer>
  );
};

export default TournamentCard;
