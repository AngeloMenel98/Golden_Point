import { useEffect, useState, useCallback } from "react";
import { ClubDTO } from "../entities/dtos/ClubDTO";
import ClubAPI from "../services/ClubApi";
import { Errors } from "../errors/Errors";

const clubAPI = new ClubAPI();

export default function useGetClubs(
  userId: string | undefined,
  isAll: boolean,
  tourId?: string | undefined
) {
  const [allClubs, setAllClubs] = useState<ClubDTO[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const getClubs = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    setErrors({});

    try {
      let clubRes: any;
      if (isAll) {
        clubRes = await clubAPI.getClubs(userId);
      } else {
        clubRes = await clubAPI.getClubsPerTour(userId, tourId);
      }
      const clubArray: ClubDTO[] = clubRes.map((c: any) => {
        const club = new ClubDTO();

        club.Id = c.id;
        club.ClubName = c.clubName;
        club.Address = c.address;
        club.CourtCount = c.courtcount;
        club.AvFrom = c.availableFrom;
        club.AvTo = c.availableTo;

        return club;
      });

      setAllClubs(clubArray);

      if (clubArray.length === 0) {
        setErrors({ general: "No clubs found for the given user ID." });
      }

      setIsLoading(false);
      setHasFetched(true);
    } catch (error) {
      setErrors({ general: "An unexpected error occurred." });
      setIsLoading(false);
    }
  }, [userId]);

  const addClubToState = (newClub: ClubDTO) => {
    setAllClubs((prevClubs) => [...prevClubs, newClub]);
  };

  useEffect(() => {
    getClubs();
  }, [getClubs]);

  return {
    allClubs,
    errors,
    isLoading,
    refetch: getClubs,
    hasFetched,
    addClubToState,
  };
}
