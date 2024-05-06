import styled from "styled-components";
import { lightGray, pastelGreen } from "../../utils/colors";

interface StyledCardProps {
  borderColor: string;
  bgColor: string;
  width: number;
}

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const StyledCard = styled.div<StyledCardProps>`
  width: ${({ width }) => `${width}px`};
  padding: 20px;
  border: 3px solid ${(props) => props.borderColor};
  border-radius: 5px;
  box-shadow: 0 0 10px ${lightGray};
  background-color: ${(props) => props.bgColor};
`;
