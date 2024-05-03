import React, { ReactNode } from "react";
import { red } from "../../../utils/colors";
import { Button, Container } from "./SecondaryButtonStyle";

interface ButtonProps {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
  errorMessage?: string | null;
}

const SecondaryButton: React.FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  errorMessage,
}) => {
  return (
    <Container>
      <Button onClick={onClick}>
        {text}
        {icon}
      </Button>
      {errorMessage && <div style={{ color: red }}>{errorMessage}</div>}
    </Container>
  );
};

export default SecondaryButton;
