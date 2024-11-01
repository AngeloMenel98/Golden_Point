import styled from "styled-components";

interface StyledCardProps {
  borderCol: string;
  backgroundCol: string;
  boxCol: string;
  mWidth: number;
  mHeight: number;
  onClick?: (event: React.MouseEvent) => void;
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
  max-height: ${({ mHeight }) => `${mHeight}px`};
  padding: 1rem;
  border: 3px solid ${(props) => props.borderCol};
  border-radius: 5px;
  box-shadow: 0 0 15px ${(props) => props.boxCol};
  background-color: ${(props) => props.backgroundCol};
  overflow-y: auto;
  transition: transform 0.2s;

  ${({ onClick }) =>
    onClick &&
    `
    cursor: pointer;

    &:hover {
      transform: scale(1.02);
    }
  `}
`;
