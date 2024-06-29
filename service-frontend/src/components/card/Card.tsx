import { ReactNode } from "react";
import { CardContainer, StyledCard } from "./CardStyle";
import { black } from "../../utils/colors";

interface CardProps {
  children: ReactNode;
  backgroundCol: string;
  borderCol: string;
  boxCol: string;
  mWidth: number;
  mHeight: number;
  error?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  borderCol,
  backgroundCol,
  boxCol,
  mWidth,
  mHeight,
  error,
}) => {
  console.log(error);
  return (
    <CardContainer>
      <StyledCard
        borderCol={borderCol}
        backgroundCol={backgroundCol}
        boxCol={boxCol}
        mWidth={mWidth}
        mHeight={mHeight}
      >
        {error && <p style={{ color: black }}>{error}</p>}
        {children}
      </StyledCard>
    </CardContainer>
  );
};

export default Card;
