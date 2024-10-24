import { ReactNode } from "react";
import { CardContainer, StyledCard } from "./CardStyle";
import { black } from "../../utils/colors";
import BouncingCircles from "../spinner/spinner";

interface CardProps {
  children: ReactNode;
  backgroundCol: string;
  borderCol: string;
  boxCol: string;
  mWidth: number;
  mHeight: number;
}

const Card: React.FC<CardProps> = ({
  children,
  borderCol,
  backgroundCol,
  boxCol,
  mWidth,
  mHeight,
}) => {
  return (
    <CardContainer>
      <StyledCard
        borderCol={borderCol}
        backgroundCol={backgroundCol}
        boxCol={boxCol}
        mWidth={mWidth}
        mHeight={mHeight}
      >
        {children}
      </StyledCard>
    </CardContainer>
  );
};

export default Card;
