import { useEffect, useState } from "react";
import Card from "../../../../components/card/Card";
import { TourDTO } from "../../../../entities/dtos/TourDTO";
import TourAPI, { DeletedTour } from "../../../../services/TourApi";
import { darkGreen, pastelGreen, white } from "../../../../utils/colors";
import TourRow from "../Rows/TourRow";
import { CardContainer } from "./TourCardStyle";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reduxSlices/store";

interface TourCardProps {
  tours: TourDTO[];
  tourApi: TourAPI;
  tourTitle: string;
  error: string;
}

const TourCard: React.FC<TourCardProps> = ({
  tours: initialTours,
  tourApi,
  tourTitle,
  error,
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const [tours, setTours] = useState<TourDTO[]>(initialTours);

  useEffect(() => {
    setTours(initialTours);
  }, [initialTours]);

  const filteredTours = tours.filter((tour) =>
    tour.TourTitle.toLowerCase().includes(tourTitle.toLowerCase())
  );

  const handleDeleteTour = async (tt: TourDTO) => {
    const deleteTour: DeletedTour = {
      tourId: tt.Id,
      userId: user?.Id,
    };

    const tourRes = await tourApi.deleteTour(deleteTour);
    if (tourRes != null) {
      setTours(tours.filter((tour) => tour.Id !== tt.Id));
    } else {
      console.error("Failed to delete tour");
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
        error={error}
      >
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