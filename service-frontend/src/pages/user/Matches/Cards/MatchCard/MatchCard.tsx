import { CardContainer, MatchContainer } from "./MatchCardStyle";
import Card from "../../../../../components/card/Card";
import {
  black,
  darkGreen,
  pastelGreen,
  white,
} from "../../../../../utils/colors";
import Match from "../../../../../components/match/Match";
import { MatchDTO } from "../../../../../entities/dtos/MatchDTO";
import { TeamDTO } from "../../../../../entities/dtos/TeamDTO";
<<<<<<< HEAD
=======
import { Note } from "../../../../admin/Tour/Cards/TourCardStyle";
>>>>>>> develop

interface MatchCardProps {
  matches: MatchDTO[];
  teams: TeamDTO[];
  error?: string;
}

const MatchCard: React.FC<MatchCardProps> = ({ matches, teams, error }) => {
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
            <Match key={match.Id} match={match} teams={teams} />
          </MatchContainer>
        ))}
<<<<<<< HEAD
        {error && <p style={{ color: black }}>{error}</p>}
=======
        {error && <Note>{error}</Note>}
>>>>>>> develop
      </Card>
    </CardContainer>
  );
};

export default MatchCard;
