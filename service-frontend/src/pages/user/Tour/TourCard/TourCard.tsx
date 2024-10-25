import Card from "../../../../components/card/Card";
import BouncingCircles from "../../../../components/spinner/spinner";
import { TourDTO } from "../../../../entities/dtos/TourDTO";
import { darkGreen, pastelGreen, white } from "../../../../utils/colors";
import TourRow from "../TourRow/TourRow";
import { CardContainer } from "./TourCardStyle";

interface TourCardProps {
  tours: TourDTO[];
  tourTitle: string;
  error: string;
}

const TourCard: React.FC<TourCardProps> = ({ tours, tourTitle, error }) => {
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
        {error && <BouncingCircles text="la creación de Tours" />}
        {filteredTours.map((tour, index) => (
          <TourRow key={index} tourData={tour} />
        ))}

        {filteredTours.length === 0 && <BouncingCircles text="nuevos Tours" />}
      </Card>
    </CardContainer>
  );
};

export default TourCard;
