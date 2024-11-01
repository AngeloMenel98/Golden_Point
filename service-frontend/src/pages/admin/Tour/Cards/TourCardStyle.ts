import styled from "styled-components";
import { darkGreen } from "../../../../utils/colors";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Note = styled.span`
  display: flex;
  color: ${darkGreen};
`;
