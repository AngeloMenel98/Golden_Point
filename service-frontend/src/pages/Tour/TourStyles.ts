import styled from "styled-components";
import { black, darkGreen, white } from "../../utils/colors";

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const NavBarContainer = styled.div`
  flex: 1;
`;

export const TourSection = styled.div`
  flex: 10;
  background-color: ${white};
  width: 100%;
  display: flex; /* Añadido */
  flex-direction: column; /* Añadido */
  align-items: flex-start;
`;

export const ButtonInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  padding-top: 1rem;
  padding-left: 5rem;
  padding-right: 15rem;
`;

export const InputContainer = styled.div`
  padding-top: 1rem;
  padding-left: 30rem;
  padding-right: 6rem;
`;
export const H2 = styled.h2`
  color: ${darkGreen};
  padding: 0.01rem 5rem;
`;
