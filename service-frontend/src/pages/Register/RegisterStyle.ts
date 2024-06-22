import styled from "styled-components";
import { pastelGreen } from "../../utils/colors";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${pastelGreen};
`;

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
  flex: 1;
  padding: 2rem 2rem;
`;
