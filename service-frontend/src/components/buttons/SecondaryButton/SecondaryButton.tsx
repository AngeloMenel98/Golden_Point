import React, { ReactNode } from "react";
import { red } from "../../../utils/colors";
import { Button, Container } from "./SecondaryButtonStyle";

interface ButtonProps {
  text: string;
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
        {text}
        {icon}
      </Button>
    </Container>
  );
};

export default SecondaryButton;
