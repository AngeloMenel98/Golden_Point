import { ReactNode } from "react";
import { CardContainer, StyledCard } from "./CardStyle";

interface CardProps {
  children: ReactNode;
  backgroundCol: string;
  borderCol: string;
  boxCol: string;
  mWidth: number;
  mHeight: number;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  borderCol,
  backgroundCol,
  boxCol,
  mWidth,
  mHeight,
  onClick,
}) => {
  return (
    <CardContainer>
      <StyledCard
        borderCol={borderCol}
        backgroundCol={backgroundCol}
        boxCol={boxCol}
        mWidth={mWidth}
        mHeight={mHeight}
        onClick={onClick}
      >
        {children}
      </StyledCard>
    </CardContainer>
  );
};

export default Card;
