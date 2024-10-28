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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const getMatches = useCallback(async () => {
    if (tournamentId == null) return;

    setIsLoading(true);
    setErrors({});

    try {
      const matchesRes: any = await matchAPI.getMatches({
        tournId: tournamentId,
        category,
        grpStage: groupStage,
      });

      if (matchesRes.fieldErrors) {
        setErrors(matchesRes.fieldErrors);
        setMatches([]);
      } else {
        const matchesArr: MatchDTO[] = matchesRes.map((m: any) => {
          const match = new MatchDTO();
          const teamsName: string[] = m.teamsname.split(", ");

          match.Id = m.id;
          match.MatchDate = m.matchdate;
          match.AmountTourCoins = m.amounttourcoins;
          match.AmountTourPoints = m.amounttourpoints;
          match.GroupName = m.groupstage;
          match.TeamsName = teamsName;
          match.Court = m.courtnumber;
          match.ClubId = m.clubid;
          match.ClubName = m.clubname;
          match.CategoryTeam = m.category;
          match.Games = m.games;

          return match;
        });

        setMatches(matchesArr);

        if (matchesArr.length === 0) {
          setErrors({ general: "No matches found for the given criteria." });
        }
      }

      setIsLoading(false);
      setHasFetched(true);
    } catch (error) {
      setErrors({ general: "An unexpected error occurred." });
    }
  }, [tournamentId, groupStage, category]);

  useEffect(() => {
    getMatches();
  }, [getMatches]);

  return { matches, errors, isLoading, refetch: getMatches, hasFetched };
}
