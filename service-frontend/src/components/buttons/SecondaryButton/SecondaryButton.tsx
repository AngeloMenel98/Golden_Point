import React, { ReactNode } from "react";
import { Button, Container } from "./SecondaryButtonStyle";

interface ButtonProps {
  text?: string;
  icon?: ReactNode;
  disabled?: boolean;
  isDangerousAction?: boolean;
  onClick?: () => void;
}

const SecondaryButton: React.FC<ButtonProps> = ({
  text,
  icon,
  disabled,
  isDangerousAction,
  onClick,
}) => {
  return (
    <Container>
      <Button
        onClick={onClick}
        isDangerous={isDangerousAction}
        hasIcon={!!icon}
        disabled={disabled}
      >
        {text && text}
        {icon && icon}
      </Button>
    </Container>
  );
};

export default SecondaryButton;
