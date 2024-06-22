import React, { ReactNode } from "react";
import { Button, Container } from "./SecondaryButtonStyle";

interface ButtonProps {
  text?: string;
  icon?: ReactNode;
  isDangerousAction?: boolean;
  onClick?: () => void;
}

const SecondaryButton: React.FC<ButtonProps> = ({
  text,
  icon,
  isDangerousAction,
  onClick,
}) => {
  return (
    <Container>
      <Button
        onClick={onClick}
        isDangerous={isDangerousAction}
        hasIcon={!!icon}
      >
        {text && text}
        {icon && icon}
      </Button>
    </Container>
  );
};

export default SecondaryButton;
