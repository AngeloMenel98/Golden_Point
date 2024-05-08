import Card from "../../../components/card/Card";
import { Tour } from "../../../entities/Tour";
import { darkGreen, pastelGreen, white } from "../../../utils/colors";
import TourRow from "../TourRow/TourRow";
import { CardContainer } from "./TourCardStyle";

interface TourCardProps {
  tours: Tour[];
}

const TourCard: React.FC<TourCardProps> = ({ tours }) => {
  return (
    <CardContainer>
      <Card
        bgColor={white}
        borderColor={darkGreen}
        boxColor={pastelGreen}
        width={1200}
      >
        {tours.map((tour, index) => (
          <TourRow key={index} tourData={tour} />
        ))}
      </Card>
    </CardContainer>
  );
};

export default TourCard;
