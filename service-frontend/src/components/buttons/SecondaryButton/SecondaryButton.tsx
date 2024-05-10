import React, { ReactNode } from "react";
import { Button, Container, StuffContainer } from "./SecondaryButtonStyle";

interface ButtonProps {
  text?: string;
  icon?: ReactNode;
  isDangerous?: boolean;
  onClick?: () => void;
}

const SecondaryButton: React.FC<ButtonProps> = ({
  text,
  icon,
  isDangerous,
  onClick,
}) => {
  return (
    <Container>
      <Button onClick={onClick} isDangerous={isDangerous}>
        {text && text}
        {icon && <StuffContainer>{icon}</StuffContainer>}
      </Button>
    </Container>
  );
};

export default SecondaryButton;
