import { useEffect, useState, useCallback } from "react";
import { Errors } from "../errors/Errors";
import TournamentAPI from "../services/TournamentApi";
import { MyTournDTO } from "../entities/dtos/MyTournDTO";
import { formatDateTime } from "../utils/transformDate";
import { ApiError } from "../services/GeneralApi";

const tournAPI = new TournamentAPI();

export default function useGetMyTourns(userId: string | undefined) {
  const [tournaments, setTournaments] = useState<MyTournDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchTourns, setFetchTourns] = useState<boolean>(false);
  const [errorTourn, setError] = useState<Errors | unknown>(null);

  const fetchTournaments = useCallback(async () => {
    setLoading(true);
    setFetchTourns(false);
    if (userId) {
      try {
        const data = await tournAPI.getMyTournaments(userId);

        const tournamentData: MyTournDTO[] = data.map((tourn: any) => {
          const tournament = new MyTournDTO();
          tournament.Id = tourn.tournamentid;
          tournament.TournTitle = tourn.tournamentname;
          tournament.TeamCat = tourn.teamcategory;
          tournament.MatchDate = formatDateTime(tourn.matchdate);
          tournament.TeamName = tourn.teamname;
          tournament.OppTeamName = tourn.oppteamname;
          tournament.GroupStage = tourn.groupstage;
          return tournament;
        });

        setTournaments(tournamentData);
        setLoading(false);
        setFetchTourns(true);
      } catch (err) {
        if (err instanceof ApiError && err.payload.fieldErrors) {
          setError(err.payload.fieldErrors);
        } else {
          setError(err);
        }
        setLoading(false);
      }
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchTournaments();
    }
  }, [userId, fetchTournaments]);

  return {
    tournaments,
    loading,
    errorTourn,
    fetchTourns,
    refetch: fetchTournaments,
  };
}
