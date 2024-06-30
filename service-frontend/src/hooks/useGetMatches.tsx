import { useEffect, useState, useCallback } from "react";
import { MatchDTO } from "../entities/dtos/MatchDTO";
import MatchAPI from "../services/MatchApi";
import { Errors } from "../errors/Errors";

const matchAPI = new MatchAPI();

export default function useGetMatches(
  tournamentId: string | null,
  groupStage: string,
  category: string
) {
  const [matches, setMatches] = useState<MatchDTO[]>([]);

  const [errors, setErrors] = useState<Errors>({});

  const getTeams = useCallback(async () => {
    if (tournamentId == null) return;

    const matchesArr: MatchDTO[] = [];
    const matchesRes: any = await matchAPI.getMatches({
      tournId: tournamentId,
      category,
      grpStage: groupStage,
    });

    if (matchesRes.fieldErrors) {
      setErrors(matchesRes.fieldErrors);
    } else {
      setErrors({});
    }

    matchesRes.forEach((m: any) => {
      const match = new MatchDTO();
      const teamsName: string[] = m.teamsname.split(", ");

      match.Id = m.matchid;
      match.MatchDate = m.matchdate;
      match.AmountTourCoins = m.tourcoins;
      match.GroupName = m.groupstage;
      match.TeamsName = teamsName;
      match.Court = m.court;
      match.ClubName = m.clubname;
      match.CategoryTeam = m.categoryteam;

      matchesArr.push(match);
    });

    setMatches(matchesArr);
  }, [tournamentId, groupStage, category]);

  useEffect(() => {
    getTeams();
  }, [getTeams]);

  return { matches, errors, refetch: getTeams };
}
