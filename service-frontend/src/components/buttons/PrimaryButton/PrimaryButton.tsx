import React, { ReactNode } from "react";
import { ButtonStyled, Container } from "./PrimaryButtonStyle";
import { red } from "../../../utils/colors";

interface ButtonProps {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
  errorMessage?: string | null;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  errorMessage,
}) => {
  return (
    <Container>
      <ButtonStyled onClick={onClick}>
        {text}
        {icon}
      </ButtonStyled>
      {errorMessage && <div style={{ color: red }}>{errorMessage}</div>}
    </Container>
  );
};

export default PrimaryButton;
