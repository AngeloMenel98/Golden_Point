import styled from "styled-components";
import { darkGreen, white } from "../../../utils/colors";

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const TournamentSection = styled.div`
  flex: 10;
  background-color: ${white};
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
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
`;

export const HeaderButtons = styled.div`
  padding-left: 0.5rem;
`;

export const H2 = styled.h2`
  color: ${darkGreen};

  padding: 0.01rem 0.5rem;
`;
