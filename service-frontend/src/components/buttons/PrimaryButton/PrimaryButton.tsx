import React from "react";
import EnterIcon from "../../../icons/EnterIcon/EnterIcon";
import { ButtonStyled } from "./PrimaryButtonStyle";

interface ButtonProps {
  children: React.ReactNode; // Contenido del botón
  icon?: boolean; // Icono del botón, opcional
  onClick?: () => void; // Función para manejar el evento onClick
}

const PrimaryButton: React.FC<ButtonProps> = ({ children, icon, onClick }) => {
  return (
    <ButtonStyled onClick={onClick}>
      {children}
      {icon && (
        <EnterIcon width={30} height={30} style={{ marginLeft: "20px" }} />
      )}
    </ButtonStyled>
  );
};

export default PrimaryButton;
