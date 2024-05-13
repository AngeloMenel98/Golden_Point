import React from "react";
import Card from "../../../../components/card/Card";
import { darkGreen, pastelGreen, white } from "../../../../utils/colors";
import { CardContainer } from "./TournamentStyle";
import TournamentRow from "../Row/TournamentRow";

interface TournamentCardProps {}

const TournamentCard: React.FC<TournamentCardProps> = ({}) => {
  return (
    <CardContainer>
      <Card
        bgColor={white}
        borderColor={darkGreen}
        boxColor={pastelGreen}
        width={1200}
      >
        <TournamentRow />
      </Card>
    </CardContainer>
  );
};

export default TournamentCard;
