import {
  Box2,
  CardContainer,
  Column2x,
  Container,
  HorizontalLine,
  MatchContainer,
  VerticalLine,
} from "./PosCardStyle";
import Card from "../../../../../components/card/Card";
import {
  black,
  darkGreen,
  pastelGreen,
  white,
} from "../../../../../utils/colors";
import { TeamDTO } from "../../../../../entities/dtos/TeamDTO";

interface PosCardProps {
  teams: TeamDTO[];
}

const PositionCard: React.FC<PosCardProps> = ({ teams }) => {
  return (
    <CardContainer>
      <Card
        backgroundCol={white}
        borderCol={darkGreen}
        boxCol={pastelGreen}
        mWidth={500}
        mHeight={350}
      >
        <Container mHeight={200} mWidth={50}>
          <Column2x>
            <Box2>
              <h3 style={{ color: "black" }}>1°</h3>
            </Box2>
            <Box2>
              <h3 style={{ color: "black" }}>2°</h3>
            </Box2>
            <Box2>
              <h3 style={{ color: "black" }}>3°</h3>
            </Box2>
          </Column2x>
          <Column2x>
            <Box2>
              <h3 style={{ color: "black" }}>Test Team</h3>
            </Box2>
            <Box2>
              <h3 style={{ color: "black" }}>Test Team 2</h3>
            </Box2>
            <Box2>
              <h3 style={{ color: "black" }}>Test Team 3</h3>
            </Box2>
          </Column2x>
          <Column2x>
            <Box2>
              <h3 style={{ color: "black" }}>Test Team</h3>
            </Box2>
            <Box2>
              <h3 style={{ color: "black" }}>Test Team 2</h3>
            </Box2>
            <Box2>
              <h3 style={{ color: "black" }}>Test Team 3</h3>
            </Box2>
          </Column2x>
        </Container>
      </Card>
    </CardContainer>
  );
};

export default PositionCard;
