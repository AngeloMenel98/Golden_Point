import Card from "../../../../components/card/Card";
import { TourDTO } from "../../../../entities/dtos/TourDTO";
import TourAPI from "../../../../services/TourApi";
import { darkGreen, pastelGreen, white } from "../../../../utils/colors";
import TourRow from "../TourRow/TourRow";
import { CardContainer } from "./TourCardStyle";

interface TourCardProps {
  tours: TourDTO[];
  tourApi: TourAPI;
  tourTitle: string;
}

const TourCard: React.FC<TourCardProps> = ({ tours, tourApi, tourTitle }) => {
  const filteredTours = tours.filter((tour) =>
    tour.TourTitle.toLowerCase().includes(tourTitle.toLowerCase())
  );

  return (
    <CardContainer>
      <Card
        bgColor={white}
        borderColor={darkGreen}
        boxColor={pastelGreen}
        width={1200}
      >
        {filteredTours.map((tour, index) => (
          <TourRow key={index} tourData={tour} tourApi={tourApi} />
        ))}
      </Card>
    </CardContainer>
  );
};

export default TourCard;
