import styled from "styled-components";
import { darkGreen, pastelGreen } from "../../utils/colors";
import { MyTournDTO } from "../../entities/dtos/MyTournDTO";
import { Link } from "react-router-dom";

const TableContainer = styled.div`
  max-height: 350px;
  overflow-y: auto;
  border: 2px solid black;
  border-radius: 10px; /* Aquí defines el redondeo */
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTh = styled.th`
  border: 1px solid black;
  padding: 8px;
  color: ${darkGreen};
  background-color: ${pastelGreen};
  text-align: center;
`;

const StyledTd = styled.td`
  border: 1px solid black;
  padding: 8px;
  color: black;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: black;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline; /* Esto agrega un subrayado al hacer hover */
  }
`;

const MyTournsTable = ({ tourns }: { tourns: MyTournDTO[] }) => {
  console.log(tourns);
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Nombre Torneo</StyledTh>
            <StyledTh>Categoria</StyledTh>
            <StyledTh>Nombre Equipo</StyledTh>
            <StyledTh>Nombre Equipo Contrario</StyledTh>
            <StyledTh>Fecha</StyledTh>
            <StyledTh>Instancia</StyledTh>
          </tr>
        </thead>
        <tbody>
          {tourns.map((t, index) => (
            <tr key={index}>
              <StyledTd>
                <StyledLink to={`/matches?tournamentId=${t.Id}`}>
                  {t.TournTitle}
                </StyledLink>
              </StyledTd>
              <StyledTd>{t.TeamCat}</StyledTd>
              <StyledTd>{t.TeamName}</StyledTd>
              <StyledTd>{t.OppTeamName}</StyledTd>
              <StyledTd>{t.MatchDate}</StyledTd>
              <StyledTd>{t.GroupStage}</StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default MyTournsTable;
