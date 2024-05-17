import { ReactNode } from "react";
import { CardContainer, StyledCard } from "./CardStyle";
import { black } from "../../utils/colors";

interface CardProps {
  children: ReactNode;
  bgColor: string;
  borderColor: string;
  boxColor: string;
  width: number;
  maxHeight?: number;
  error?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  borderColor,
  bgColor,
  boxColor,
  width,
  maxHeight = 300,
  error,
}) => {
  return (
    <CardContainer>
      <StyledCard
        borderColor={borderColor}
        bgColor={bgColor}
        boxColor={boxColor}
        width={width}
        maxHeight={maxHeight}
      >
        {error && <p style={{ color: black }}>{error}</p>}
        {children}
      </StyledCard>
    </CardContainer>
  );
};

export default Card;
