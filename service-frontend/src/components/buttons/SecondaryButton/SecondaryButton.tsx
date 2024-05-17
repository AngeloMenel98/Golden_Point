import React, { ReactNode } from "react";
import { Button, Container } from "./SecondaryButtonStyle";

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
      <Button onClick={onClick} isDangerous={isDangerous} hasIcon={!!icon}>
        {text && text}
        {icon && icon}
      </Button>
    </Container>
  );
};

export default SecondaryButton;
