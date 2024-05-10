import styled from "styled-components";
import { white } from "../../utils/colors";

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const NavBarContainer = styled.div`
  flex: 1;
`;

export const TournamentSection = styled.div`
  flex: 10;
  background-color: ${white};
  width: 100%;
  display: flex; /* Añadido */
  flex-direction: column; /* Añadido */
  align-items: flex-start;
`;
