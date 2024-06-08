import { ReactNode } from "react";
import { CardContainer, StyledCard } from "./CardStyle";
import { black } from "../../utils/colors";

interface CardProps {
  children: ReactNode;
  backgroundCol: string;
  borderCol: string;
  boxCol: string;
  mWidth: number;
  error?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  borderCol,
  backgroundCol,
  boxCol,
  mWidth,
  error,
}) => {
  return (
    <CardContainer>
      <StyledCard
        borderCol={borderCol}
        backgroundCol={backgroundCol}
        boxCol={boxCol}
        width={mWidth}
      >
        {error && <p style={{ color: black }}>{error}</p>}
        {children}
      </StyledCard>
    </CardContainer>
  );
};

export default Card;
