<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import { useState } from "react";
>>>>>>> develop
import Card from "../../../../components/card/Card";
import { TourDTO } from "../../../../entities/dtos/TourDTO";
import TourAPI, { DeletedTour } from "../../../../services/TourApi";
import { darkGreen, pastelGreen, white } from "../../../../utils/colors";
import TourRow from "../Rows/TourRow";
<<<<<<< HEAD
import { CardContainer } from "./TourCardStyle";
=======
import { CardContainer, Note } from "./TourCardStyle";
>>>>>>> develop
import { useSelector } from "react-redux";
import { RootState } from "../../../../reduxSlices/store";
import BouncingCircles from "../../../../components/spinner/spinner";

interface TourCardProps {
  tours: TourDTO[];
  tourApi: TourAPI;
  tourTitle: string;
  error: string;
<<<<<<< HEAD
=======
  isLoading: boolean;
>>>>>>> develop
  refetch: () => void;
}

const TourCard: React.FC<TourCardProps> = ({
  tours: initialTours,
  tourApi,
  tourTitle,
  error,
<<<<<<< HEAD
  refetch,
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const [tours, setTours] = useState<TourDTO[]>(initialTours);

  useEffect(() => {
    setTours(initialTours);
  }, [initialTours]);
=======
  isLoading,
  refetch,
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const [tours, setTours] = useState<TourDTO[]>(() => initialTours);
>>>>>>> develop

  const filteredTours = tours.filter((tour) =>
    tour.TourTitle.toLowerCase().includes(tourTitle.toLowerCase())
  );

  const handleDeleteTour = async (tt: TourDTO) => {
    const deleteTour: DeletedTour = {
      tourId: tt.Id,
      userId: user?.id,
    };

    const tourRes = await tourApi.deleteTour(deleteTour);
    if (tourRes != null) {
<<<<<<< HEAD
      setTours(tours.filter((tour) => tour.Id !== tt.Id));
      refetch();
    } else {
      console.error("Failed to delete tour");
=======
      console.log("tourRes", tourRes);
      setTours((prevTours) =>
        prevTours.filter((tour) => tour.Id !== tourRes.id)
      );

      refetch();
    } else {
      alert("Error al eliminar Tour");
>>>>>>> develop
    }
  };

  return (
    <CardContainer>
      <Card
        backgroundCol={white}
        borderCol={darkGreen}
        boxCol={pastelGreen}
        mWidth={1200}
        mHeight={1000}
      >
<<<<<<< HEAD
        {error && <BouncingCircles text="la creación de un Tour" />}
=======
        {filteredTours.length === 0 && error && <Note>{error}</Note>}
>>>>>>> develop
        {filteredTours.map((tour) => (
          <TourRow
            key={tour.Id}
            tourData={tour}
            onDelete={() => handleDeleteTour(tour)}
          />
        ))}
<<<<<<< HEAD
        {filteredTours.length === 0 && <BouncingCircles text="nuevos Tours" />}
=======
        {isLoading && <BouncingCircles text="los Tours" />}
>>>>>>> develop
      </Card>
    </CardContainer>
  );
};

export default TourCard;
