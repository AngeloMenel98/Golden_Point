import { useEffect, useState } from "react";
import { MatchDTO } from "../entities/dtos/MatchDTO";
import MatchAPI from "../services/MatchApi";

const matchAPI = new MatchAPI();

export default function useGetMatches(
  tournamentId: string | null,
  groupStage: string,
  category: string
) {
  const [matches, setMatches] = useState<MatchDTO[]>([]);

  if (tournamentId == null) {
    return { matches, matchAPI };
  }

  const getTeams = async () => {
    const matchesArr: MatchDTO[] = [];

    const matchesRes: any = await matchAPI.getMatches({
      tournId: tournamentId,
      category,
      grpStage: groupStage,
    });

    matchesRes.forEach((m: any) => {
      const match = new MatchDTO();

      const teamsName: string[] = m.teamsname.split(", ");

      match.MatchDate = m.matchdate;
      match.AmountTourCoins = m.tourpoints;
      match.AmountTourCoins = m.tourcoins;
      match.GroupName = m.groupstage;
      match.TeamsName = teamsName;
      match.Court = m.court;
      match.ClubName = m.clubname;

      matchesArr.push(match);
    });

    setMatches(matchesArr);
  };

  useEffect(() => {
    getTeams();
  }, [tournamentId]);

  return { matches, matchAPI };
}
