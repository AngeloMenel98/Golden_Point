import styled from "styled-components";

interface StyledCardProps {
  borderColor: string;
  bgColor: string;
  boxColor: string;
  width: number;
  maxHeight: number;
}

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledCard = styled.div<StyledCardProps>`
  width: ${({ width }) => `${width}px`};
  padding: 20px;
  border: 3px solid ${(props) => props.borderColor};
  border-radius: 5px;
  box-shadow: 0 0 15px ${(props) => props.boxColor};
  background-color: ${(props) => props.bgColor};

  max-height: ${(props) => props.maxHeight}px; // Aplicar la altura máxima
  overflow-y: auto;
`;
