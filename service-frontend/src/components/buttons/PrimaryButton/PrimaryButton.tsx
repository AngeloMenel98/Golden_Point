import React, { ReactNode } from "react";
import { ButtonStyled, Container } from "./PrimaryButtonStyle";

interface ButtonProps {
  text?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

const PrimaryButton: React.FC<ButtonProps> = ({ text, icon, onClick }) => {
  return (
    <Container>
      <ButtonStyled onClick={onClick}>
        {text}
        {icon}
      </ButtonStyled>
    </Container>
  );
};

export default PrimaryButton;
