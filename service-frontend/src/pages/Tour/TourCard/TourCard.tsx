import Card from "../../../components/card/Card";
import { User } from "../../../entities/User";
import { TourDTO } from "../../../entities/dtos/TourDTO";
import TourAPI from "../../../services/TourApi";
import { darkGreen, pastelGreen, white } from "../../../utils/colors";
import TourRow from "../TourRow/TourRow";
import { CardContainer } from "./TourCardStyle";

interface TourCardProps {
  tours: TourDTO[];
  tourApi: TourAPI;
  user: User;
}

const TourCard: React.FC<TourCardProps> = ({ tours, tourApi, user }) => {
  return (
    <CardContainer>
      <Card
        bgColor={white}
        borderColor={darkGreen}
        boxColor={pastelGreen}
        width={1200}
      >
        {tours.map((tour, index) => (
          <TourRow key={index} tourData={tour} tourApi={tourApi} user={user} />
        ))}
      </Card>
    </CardContainer>
  );
};

export default TourCard;
