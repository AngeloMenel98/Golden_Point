import { useEffect, useState } from "react";
import Card from "../../../../components/card/Card";
import { TourDTO } from "../../../../entities/dtos/TourDTO";
import TourAPI, { DeletedTour } from "../../../../services/TourApi";
import { darkGreen, pastelGreen, white } from "../../../../utils/colors";
import TourRow from "../Rows/TourRow";
import { CardContainer } from "./TourCardStyle";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reduxSlices/store";
import BouncingCircles from "../../../../components/spinner/spinner";

interface TourCardProps {
  tours: TourDTO[];
  tourApi: TourAPI;
  tourTitle: string;
  error: string;
  refetch: () => void;
}

const TourCard: React.FC<TourCardProps> = ({
  tours: initialTours,
  tourApi,
  tourTitle,
  error,
  refetch,
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const [tours, setTours] = useState<TourDTO[]>(() => initialTours);

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
      console.log("tourRes", tourRes);
      setTours((prevTours) =>
        prevTours.filter((tour) => tour.Id !== tourRes.id)
      );

      refetch();
    } else {
      alert("Error al eliminar Tour");
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
        {(filteredTours.length === 0 || error) && (
          <BouncingCircles text="la creación de un Tour" />
        )}
        {filteredTours.map((tour) => (
          <TourRow
            key={tour.Id}
            tourData={tour}
            onDelete={() => handleDeleteTour(tour)}
          />
        ))}
      </Card>
    </CardContainer>
  );
};

export default TourCard;
