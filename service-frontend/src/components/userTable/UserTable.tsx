import React from "react";
import styled from "styled-components";

// Contenedor para la tabla con altura máxima
const TableContainer = styled.div`
  max-height: 350px; /* Ajusta esta altura según tus necesidades */
  overflow-y: auto;
  border: 1px solid black; /* Agrega un borde si lo deseas */
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTh = styled.th`
  border: 1px solid black;
  padding: 8px;
  color: black;
  background-color: #f2f2f2;
`;

const StyledTd = styled.td`
  border: 1px solid black;
  padding: 8px;
  color: black;
`;

const UsersTable = ({ users }: { users: any[] }) => {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Rank</StyledTh>
            <StyledTh>Last Name</StyledTh>
            <StyledTh>First Name</StyledTh>
            <StyledTh>Total Points</StyledTh>
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
