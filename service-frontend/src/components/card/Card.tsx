import { ReactNode } from "react";
import { CardContainer, StyledCard } from "./CardStyle";

interface CardProps {
  children: ReactNode;
  bgColor: string;
  borderColor: string;
  boxColor: string;
  width: number;
  maxHeight?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  borderColor,
  bgColor,
  boxColor,
  width,
  maxHeight = 300,
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
        {children}
      </StyledCard>
    </CardContainer>
  );
};

export default Card;
