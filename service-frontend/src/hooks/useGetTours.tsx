import { useEffect, useState } from "react";
import { TourDTO } from "../entities/dtos/TourDTO";
import { User } from "../entities/User";
import TourAPI from "../services/TourApi";

const tourAPI = new TourAPI();

export default function useGetTours(user: User | null) {
  const [tours, setTours] = useState<TourDTO[]>([]);

  const [error, setError] = useState<string>("");

  if (!user) {
    return {
      tours,
      tourAPI,
      error,
    };
  }
  const getTours = async () => {
    const tourArray: TourDTO[] = [];

    const tourRes = await tourAPI.getTours(user.Id);

    if (tourRes.fieldErrors) {
      setError(tourRes.fieldErrors.notFound);

      return {
        tours,
        tourAPI,
        error,
      };
    }

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
  };

  useEffect(() => {
    getTours();
  }, []);

  return { tours, tourAPI, error };
}
