import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CardContainer, MatchContainer, ButtonContainer } from "./MatchCardStyle";
import Card from "../../../../../components/card/Card";
import { darkGreen, pastelGreen, white } from "../../../../../utils/colors";
import Match from "../../../../../components/match/Match";
import { MatchDTO } from "../../../../../entities/dtos/MatchDTO";
import { TeamDTO } from "../../../../../entities/dtos/TeamDTO";
import { Note } from "../../../../admin/Tour/Cards/TourCardStyle";
import TournamentAPI from "../../../../../services/TournamentApi";
import { RootState } from "../../../../../reduxSlices/store";
import SecondaryButton from "../../../../../components/buttons/SecondaryButton/SecondaryButton";

interface MatchCardProps {
  matches: MatchDTO[];
  teams: TeamDTO[];
  error?: string;
  tournamentId?: string;
  tournamentStatus?: "pending" | "inProgress" | "finish";
  onRefetch?: () => Promise<void>;
}

const tournamentAPI = new TournamentAPI();

const MatchCard: React.FC<MatchCardProps> = ({
  matches,
  teams,
  error,
  tournamentId,
  tournamentStatus,
  onRefetch,
}) => {
  const [isStarting, setIsStarting] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);

  const handleStartTournament = async () => {
    if (!tournamentId || !user?.id) return;

    setIsStarting(true);
    try {
      await tournamentAPI.startTournament({
        tournamentId,
        userId: user.id,
      });
      alert("Torneo iniciado exitosamente");
      if (onRefetch) {
        await onRefetch();
      }
    } catch (err) {
      alert("Error al iniciar torneo");
    } finally {
      setIsStarting(false);
    }
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
        {tournamentStatus === "pending" && (
          <ButtonContainer>
            <SecondaryButton
              text={isStarting ? "Iniciando..." : "Iniciar Torneo"}
              onClick={handleStartTournament}
              disabled={isStarting}
            />
          </ButtonContainer>
        )}
        {matches.map((match) => (
          <MatchContainer>
            <Match key={match.Id} match={match} teams={teams} />
          </MatchContainer>
        ))}
        {error && <Note>{error}</Note>}
      </Card>
    </CardContainer>
  );
};

export default MatchCard;
