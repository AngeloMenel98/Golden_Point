import styled from "styled-components";

interface StyledCardProps {
  borderCol: string;
  backgroundCol: string;
  boxCol: string;
  mWidth: number;
}

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
`;

export const StyledCard = styled.div<StyledCardProps>`
  flex: 1;

  max-width: ${({ mWidth }) => `${mWidth}px`};
  padding: 20px;
  border: 3px solid ${(props) => props.borderCol};
  border-radius: 5px;
  box-shadow: 0 0 15px ${(props) => props.boxCol};
  background-color: ${(props) => props.backgroundCol};
  overflow-y: auto;
`;
