import styled from "styled-components";
import { darkGreen } from "../../../utils/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;
`;

export const ButtonContainer = styled.div`
  width: 100%;
`;

export const ContentContainer = styled.div`
  width: 100%;
`;

export const Label = styled.span`
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: ${darkGreen};
`;
