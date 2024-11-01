import Card from "../../../../components/card/Card";
import BouncingCircles from "../../../../components/spinner/spinner";
import { TourDTO } from "../../../../entities/dtos/TourDTO";
import { darkGreen, pastelGreen, white } from "../../../../utils/colors";
<<<<<<< HEAD
=======
import { Note } from "../../../admin/Tour/Cards/TourCardStyle";
>>>>>>> develop
import TourRow from "../TourRow/TourRow";
import { CardContainer } from "./TourCardStyle";

interface TourCardProps {
  tours: TourDTO[];
  tourTitle: string;
<<<<<<< HEAD
  error: string;
}

const TourCard: React.FC<TourCardProps> = ({ tours, tourTitle, error }) => {
=======
  isLoading: boolean;
  error: string;
}

const TourCard: React.FC<TourCardProps> = ({
  tours,
  tourTitle,
  isLoading,
  error,
}) => {
>>>>>>> develop
  const filteredTours = tours.filter((tour) =>
    tour.TourTitle.toLowerCase().includes(tourTitle.toLowerCase())
  );

  return (
    <CardContainer>
      <Card
        backgroundCol={white}
        borderCol={darkGreen}
        boxCol={pastelGreen}
        mWidth={1200}
        mHeight={500}
      >
<<<<<<< HEAD
        {(filteredTours.length === 0 || error) && (
          <BouncingCircles text="nuevos Tours" />
        )}
        {filteredTours.map((tour, index) => (
          <TourRow key={index} tourData={tour} />
        ))}
=======
        {filteredTours.length === 0 && error && <Note>{error}</Note>}
        {filteredTours.map((tour, index) => (
          <TourRow key={index} tourData={tour} />
        ))}
        {isLoading && <BouncingCircles text="los Tours" />}
>>>>>>> develop
      </Card>
    </CardContainer>
  );
};

export default TourCard;
