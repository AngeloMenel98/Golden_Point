import { darkGreen, pastelGreen } from "../../utils/colors";
import { MyTournDTO } from "../../entities/dtos/MyTournDTO";
import Card from "../card/Card";
import {
  CardCategory,
  CardsContainer,
  CardText,
  CardTitle,
  StyledLink,
  TitleRow,
  VsText,
} from "./myTournsStyle";

const MyTournsCards = ({ tourns }: { tourns: MyTournDTO[] }) => {
  return (
    <CardsContainer>
      {tourns.map((t, index) => (
        <Card
          key={index}
          backgroundCol={pastelGreen}
          borderCol={darkGreen}
          boxCol={darkGreen}
          mWidth={400}
          mHeight={400}
        >
          <TitleRow>
            <CardTitle>
              <StyledLink to={`/matches?tournamentId=${t.Id}`}>
                {t.TournTitle}
              </StyledLink>
            </CardTitle>
            <CardCategory>{t.TeamCat}</CardCategory>
          </TitleRow>
          <CardText>
            {t.TeamName}
            <VsText>vs</VsText>
            {t.OppTeamName}
          </CardText>
          <CardText>
            <strong>Fecha:</strong> {t.MatchDate}
          </CardText>
          <CardText>
            <strong>Instancia:</strong> {t.GroupStage}
          </CardText>
        </Card>
      ))}
    </CardsContainer>
  );
};

export default MyTournsCards;
