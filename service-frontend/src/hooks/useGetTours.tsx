import { useEffect, useState, useCallback } from "react";
import { TourDTO } from "../entities/dtos/TourDTO";
import TourAPI from "../services/TourApi";
import { UserData } from "../utils/interfaces";

const tourAPI = new TourAPI();

export default function useGetTours(user: UserData | null) {
  const [tours, setTours] = useState<TourDTO[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const getTours = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    setHasFetched(false);
    setError("");

    try {
      const tourArray: TourDTO[] = [];
      const tourRes = await tourAPI.getTours(user.id);

      if (tourRes.fieldErrors) {
        setError(tourRes.fieldErrors.notFound);
      } else {
        tourRes.forEach((t: any) => {
          const newTour = new TourDTO();

          newTour.Id = t.tourid;
          newTour.TourTitle = t.tourtitle;
          newTour.TourCode = t.tourcode;
          newTour.UserCount = t.usercount;
          newTour.TournamentCount = t.tournamentcount;
          newTour.UserOwner = t.firstusername;

          tourArray.push(newTour);
        });

        setTours(tourArray);
      }

      setIsLoading(false);
      setHasFetched(true);
    } catch (error) {
      setError("An unexpected error occurred while fetching tours.");
    }
  }, [user]);

  useEffect(() => {
    getTours();
  }, [getTours]);

  return {
    tours,
    error,
    isLoading,
    hasFetched,
    refetch: getTours,
  };
}
