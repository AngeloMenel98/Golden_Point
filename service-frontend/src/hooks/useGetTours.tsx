import { useEffect, useState, useCallback } from "react";
import { TourDTO } from "../entities/dtos/TourDTO";
import { User } from "../entities/User";
import TourAPI from "../services/TourApi";

const tourAPI = new TourAPI();

export default function useGetTours(user: User | null) {
  const [tours, setTours] = useState<TourDTO[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const getTours = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    setError("");

    try {
      const tourArray: TourDTO[] = [];
      const tourRes = await tourAPI.getTours(user.Id);

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

      setHasFetched(true);

      setIsLoading(false);
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
