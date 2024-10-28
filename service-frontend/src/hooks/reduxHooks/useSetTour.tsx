import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { TourData } from "../../utils/interfaces";
import { setTour } from "../../reduxSlices/tour/tourSlice";

const getTourTokenFromLocalStorage = () => {
  return localStorage.getItem("tourToken");
};

const useSetTour = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tourToken = getTourTokenFromLocalStorage();
    if (tourToken) {
      try {
        const decodedToken: any = jwtDecode(tourToken);

        console.log(decodedToken);
        const tourData: TourData = {
          id: decodedToken.id,
          tourTitle: decodedToken.tourTitle,
          tourCode: decodedToken.tourCode,
          userCount: decodedToken.userCount,
          tournamentCount: decodedToken.tournamentCount,
          userOwner: decodedToken.userOwner,
        };

        dispatch(setTour(tourData));
      } catch (error) {
        console.error("Error decoding tour token:", error);
      }
    }
  }, [dispatch]);
};

export default useSetTour;
