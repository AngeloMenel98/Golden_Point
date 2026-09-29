import { useEffect, useState, useCallback } from "react";
import { TourDTO } from "../entities/dtos/TourDTO";
import TourAPI from "../services/TourApi";
import { UserData } from "../utils/interfaces";
import { ApiError } from "../services/GeneralApi";

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
      const data = await tourAPI.getTours(user.id);

      data.forEach((t: any) => {
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
      setHasFetched(true);
    } catch (err) {
      if (err instanceof ApiError && err.payload.fieldErrors) {
        setError(err.payload.fieldErrors.notFound ?? "");
      } else {
        setError("An unexpected error occurred while fetching tours.");
      }
    } finally {
      setIsLoading(false);
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
