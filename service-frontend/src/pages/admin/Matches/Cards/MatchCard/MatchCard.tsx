import { useState } from "react";
import { CardContainer, MatchContainer } from "./MatchCardStyle";
import Card from "../../../../../components/card/Card";
import { darkGreen, pastelGreen, white } from "../../../../../utils/colors";
import Match from "../../../../../components/match/Match";
import EditMatch from "../../Modals/EditMatch/EditMatch";
import { MatchDTO } from "../../../../../entities/dtos/MatchDTO";
import { TeamDTO } from "../../../../../entities/dtos/TeamDTO";

interface MatchCardProps {
  matches: MatchDTO[];
  teams: TeamDTO[];
  error?: string;
  reloadMatches: () => void;
}

export interface MatchData {
  matchId: string;
  clubId: string;
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

const MatchCard: React.FC<MatchCardProps> = ({
  matches,
  teams,
  error,
  reloadMatches,
}) => {
  const [isMatchOpen, setIsMatchOpen] = useState(false);
  const [editMatch, setEditMatch] = useState<MatchData>({
    matchId: "",
    clubId: "",
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
  const closeMatchModal = () => {
    setIsMatchOpen(false);
  };
  const handleChangeMatch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditMatch({ ...editMatch, [e.target.id]: e.target.value });
  };

  return (
    <CardContainer>
      <Card
        backgroundCol={white}
        borderCol={darkGreen}
        boxCol={pastelGreen}
        mWidth={1200}
        mHeight={350}
      >
        {matches.map((match) => (
          <MatchContainer>
            <Match
              key={match.Id}
              onClick={openMatchModal}
              match={match}
              teams={teams}
              onEditMatch={setEditMatch}
            />
          </MatchContainer>
        ))}
      </Card>

      {isMatchOpen && (
        <EditMatch
          editMatch={editMatch}
          onEditMatch={handleChangeMatch}
          onClose={closeMatchModal}
          reloadMatches={reloadMatches}
        />
      )}
    </CardContainer>
  );
};

export default MatchCard;
