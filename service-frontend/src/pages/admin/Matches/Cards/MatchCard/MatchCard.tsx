import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../reduxSlices/store";
import { CardContainer } from "./MatchCardStyle";
import Card from "../../../../../components/card/Card";
import { darkGreen, pastelGreen, white } from "../../../../../utils/colors";
import Match from "../../../../../components/match/Match";
import EditMatch from "../../Modals/EditMatch/EditMatch";

interface MatchCardProps {
  teamsName: string[];
  error: string;
}

const MatchCard: React.FC<MatchCardProps> = ({ teamsName, error }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const [isMatchOpen, setIsMatchOpen] = useState(false);

  const openMatchModal = () => {
    setIsMatchOpen(true);
  };
  const closeMatchModal = () => {
    setIsMatchOpen(false);
  };

  const editMatchData = () => {
    console.log("Hola");
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
        <Match onClick={openMatchModal} teamsName={teamsName} />
      </Card>

      {isMatchOpen ? (
        <EditMatch
          dateMatch="sss"
          courtMatch="0"
          editMatchData={editMatchData}
          onClose={closeMatchModal}
        />
      ) : (
        <></>
      )}
    </CardContainer>
  );
};

export default MatchCard;
