import styled from "styled-components";
import { darkGreen, mint, pastelGreen } from "../../utils/colors";
import { MyTournDTO } from "../../entities/dtos/MyTournDTO";
import { Link } from "react-router-dom";
import Card from "../card/Card";

// Estilos de los contenedores de las tarjetas
const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px; /* Espacio entre tarjetas */
  justify-content: center; /* Alineación centrada */
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const CardTitle = styled.h3`
  color: ${darkGreen};
  font-weight: bold;
  margin: 0; /* Para que no agregue un margen adicional */
`;

const CardCategory = styled.span`
  color: ${darkGreen};
  font-weight: 450;
  margin-left: 10px;
`;

const CardText = styled.p`
  color: ${darkGreen};
  margin: 4px 0;
  text-align: center; /* Centrar el texto */
`;

const StyledLink = styled(Link)`
  color: ${darkGreen};
  font-weight: 750;
  text-decoration: none;

  &:hover {
    color: ${mint};
    text-decoration: underline;
  }
`;

const VsText = styled.span`
  display: block;
  font-weight: bold;
  margin: 4px 0;
`;

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
            <CardCategory>{t.TeamCat}</CardCategory> {/* Categoría al lado */}
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
