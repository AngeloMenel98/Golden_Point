import styled from "styled-components";
import { darkGreen, white } from "../../../utils/colors";

export const TournamentSection = styled.div`
  flex: 10;
  background-color: ${white};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const SpaceContainer = styled.div`
  padding: 0.5rem;
`;

export const H3 = styled.h3`
  color: ${darkGreen};
  padding: 0.01rem 0.5rem;
`;
