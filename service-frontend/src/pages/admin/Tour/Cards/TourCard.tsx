import { useState } from "react";
import Card from "../../../../components/card/Card";
import { TourDTO } from "../../../../entities/dtos/TourDTO";
import TourAPI, { DeletedTour } from "../../../../services/TourApi";
import { darkGreen, pastelGreen, white } from "../../../../utils/colors";
import TourRow from "../Rows/TourRow";
import { CardContainer, Note } from "./TourCardStyle";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reduxSlices/store";
import BouncingCircles from "../../../../components/spinner/spinner";
import { ApiError } from "../../../../services/GeneralApi";

interface TourCardProps {
  tours: TourDTO[];
  tourApi: TourAPI;
  tourTitle: string;
  error: string;
  isLoading: boolean;
  refetch: () => void;
}

const TourCard: React.FC<TourCardProps> = ({
  tours: initialTours,
  tourApi,
  tourTitle,
  error,
  isLoading,
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

    try {
      const deleted = await tourApi.deleteTour(deleteTour);
      setTours((prevTours) =>
        prevTours.filter((tour) => tour.Id !== deleted.id)
      );
      refetch();
    } catch (err) {
      if (err instanceof ApiError) {
        alert("Error al eliminar Tour");
      }
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
        {filteredTours.length === 0 && error && <Note>{error}</Note>}
        {filteredTours.map((tour) => (
          <TourRow
            key={tour.Id}
            tourData={tour}
            onDelete={() => handleDeleteTour(tour)}
          />
        ))}
        {isLoading && <BouncingCircles text="los Tours" />}
      </Card>
    </CardContainer>
  );
};

export default TourCard;
