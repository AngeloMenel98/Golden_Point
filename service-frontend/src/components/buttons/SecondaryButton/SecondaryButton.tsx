import React, { ReactNode } from "react";
import { red } from "../../../utils/colors";
import { Button, Container } from "./SecondaryButtonStyle";

interface ButtonProps {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
}

const SecondaryButton: React.FC<ButtonProps> = ({ text, icon, onClick }) => {
  return (
    <Container>
      <Button onClick={onClick}>
        {text}
        {icon}
      </Button>
    </Container>
  );
};

export default SecondaryButton;
