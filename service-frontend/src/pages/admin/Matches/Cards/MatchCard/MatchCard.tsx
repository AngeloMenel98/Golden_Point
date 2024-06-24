import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../reduxSlices/store";
import { CardContainer } from "./MatchCardStyle";
import Card from "../../../../../components/card/Card";
import { darkGreen, pastelGreen, white } from "../../../../../utils/colors";
import Match from "../../../../../components/match/Match";

interface MatchCardProps {
  error: string;
}

const TourCard: React.FC<MatchCardProps> = ({ error }) => {
  const user = useSelector((state: RootState) => state.user.user);

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
        <Match />
      </Card>
    </CardContainer>
  );
};

export default TourCard;
