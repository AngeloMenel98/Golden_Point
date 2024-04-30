import React from "react";
import EnterIcon from "../../../icons/EnterIcon/EnterIcon";
import { ButtonStyled, Container } from "./PrimaryButtonStyle";
import { red } from "../../../utils/colors";

interface ButtonProps {
  children: React.ReactNode; // Contenido del botón
  icon?: boolean; // Icono del botón, opcional
  onClick?: () => void;
  errorMessage?: string | null;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  icon,
  onClick,
  errorMessage,
}) => {
  return (
    <Container>
      <ButtonStyled onClick={onClick}>
        {children}
        {icon && (
          <EnterIcon width={30} height={30} style={{ marginLeft: "20px" }} />
        )}
      </ButtonStyled>
      {errorMessage && <div style={{ color: red }}>{errorMessage}</div>}
    </Container>
  );
};

export default PrimaryButton;
