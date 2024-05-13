import styled from "styled-components";
import { darkGreen, white } from "../../../utils/colors";

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
  display: flex;
  flex-direction: column;

  flex: 10;
  background-color: ${white};
  width: 100%;

  padding-left: 1rem;
  padding-right: 1rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  padding-top: 1rem;
`;
export const H2 = styled.h2`
  color: ${darkGreen};

  padding: 0.1rem 1rem;
`;
