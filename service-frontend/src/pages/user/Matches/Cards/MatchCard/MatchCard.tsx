import { useState } from "react";
import { CardContainer, MatchContainer } from "./MatchCardStyle";
import Card from "../../../../../components/card/Card";
import { darkGreen, pastelGreen, white } from "../../../../../utils/colors";
import Match from "../../../../../components/match/Match";
import { MatchDTO } from "../../../../../entities/dtos/MatchDTO";
import { TeamDTO } from "../../../../../entities/dtos/TeamDTO";

interface MatchCardProps {
  matches: MatchDTO[];
  teams: TeamDTO[];
  error?: string;
}

export interface MatchData {
  matchId: string;
  teamsId: string[];
  date: string;
  teamsName: string[];
  court: string;
  set11: string;
  set21: string;
  set31: string;
  set12: string;
  set22: string;
  set32: string;
}

const MatchCard: React.FC<MatchCardProps> = ({ matches, teams, error }) => {
  const [isMatchOpen, setIsMatchOpen] = useState(false);
  const [editMatch, setEditMatch] = useState<MatchData>({
    matchId: "",
    teamsId: [],
    date: "",
    teamsName: [],
    court: "",
    set11: "",
    set21: "",
    set31: "",
    set12: "",
    set22: "",
    set32: "",
  });

  const openMatchModal = () => {
    setIsMatchOpen(true);
  };

  return (
    <CardContainer>
      <Card
        backgroundCol={white}
        borderCol={darkGreen}
        boxCol={pastelGreen}
        mWidth={1200}
        mHeight={350}
        error={error}
      >
        {matches.map((match) => (
          <MatchContainer>
            <Match key={match.Id} match={match} teams={teams} />
          </MatchContainer>
        ))}
      </Card>
    </CardContainer>
  );
};

export default MatchCard;
