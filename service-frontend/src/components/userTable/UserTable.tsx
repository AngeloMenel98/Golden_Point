import styled from "styled-components";
import { darkGreen, pastelGreen } from "../../utils/colors";

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

export const H3 = styled.h3`
  color: ${darkGreen};
  padding: 0.01rem 0.5rem;
`;

const UsersTable = ({ users }: { users: any[] }) => {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Posición</StyledTh>
            <StyledTh>Apellido</StyledTh>
            <StyledTh>Nombre</StyledTh>
            <StyledTh>Puntos Totales</StyledTh>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={u.id}>
              <StyledTd>{index + 1}°</StyledTd>
              <StyledTd>{u.lastname}</StyledTd>
              <StyledTd>{u.firstname}</StyledTd>
              <StyledTd>{u.totalpoints}</StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default UsersTable;
