import { ReactNode } from "react";
import { CardContainer, StyledCard } from "./CardStyle";

interface CardProps {
  children: ReactNode;
  bgColor: string;
  borderColor: string;
  boxColor: string;
  width: number;
}

const Card: React.FC<CardProps> = ({
  children,
  borderColor,
  bgColor,
  boxColor,
  width,
}) => {
  return (
    <CardContainer>
      <StyledCard
        borderColor={borderColor}
        bgColor={bgColor}
        boxColor={boxColor}
        width={width}
      >
        {children}
      </StyledCard>
    </CardContainer>
  );
};

export default Card;
