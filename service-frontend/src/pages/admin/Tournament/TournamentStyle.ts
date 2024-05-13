import styled from "styled-components";
import { black, darkGreen, white } from "../../../utils/colors";

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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const SpaceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TourNameContainer = styled.div`
  padding: 11rem;
`;

export const InputContainer = styled.div`
  padding: 1rem 1rem 1rem 35rem;
`;

export const ButtonContainer = styled.div`
  padding: 1rem 15rem 1rem 1rem;
`;

export const HeaderButtons = styled.div`
  padding-left: 1rem;
`;

export const H2 = styled.h2`
  color: ${darkGreen};
  padding: 0.0011rem 1rem;
`;
