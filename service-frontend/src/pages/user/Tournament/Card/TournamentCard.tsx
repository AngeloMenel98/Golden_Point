import React from "react";
import Card from "../../../../components/card/Card";
import { darkGreen, pastelGreen, white } from "../../../../utils/colors";
import { CardContainer } from "./TournamentStyle";
import TournamentRow from "../Row/TournamentRow";
import { TournamentDTO } from "../../../../entities/dtos/TournamentDTO";
import BouncingCircles from "../../../../components/spinner/spinner";
<<<<<<< HEAD
=======
import { Note } from "../../../admin/Tour/Cards/TourCardStyle";
>>>>>>> develop

interface TournamentCardProps {
  tournaments: TournamentDTO[];
  tournamentTitle: string;
<<<<<<< HEAD
=======
  isLoading: boolean;
>>>>>>> develop
  error: string | undefined;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  tournaments,
  tournamentTitle,
<<<<<<< HEAD
=======
  isLoading,
>>>>>>> develop
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
<<<<<<< HEAD
        {(filteredTourns.length === 0 || error) && (
          <BouncingCircles text="nuevos Torneo" />
        )}
        {filteredTourns.map((tourn, index) => (
          <TournamentRow key={index} tournData={tourn} />
        ))}
=======
        {filteredTourns.length === 0 && error && <Note>{error}</Note>}
        {filteredTourns.map((tourn, index) => (
          <TournamentRow key={index} tournData={tourn} />
        ))}
        {isLoading && <BouncingCircles text="los Torneos" />}
>>>>>>> develop
      </Card>
    </CardContainer>
  );
};

export default TournamentCard;
