import React from "react";
import EnterIcon from "../../../icons/EnterIcon/EnterIcon";
import { ButtonStyled } from "./PrimaryButtonStyle";

interface ButtonProps {
  children: React.ReactNode; // Contenido del botón
  icon?: React.ReactNode; // Icono del botón, opcional
  onClick?: () => void; // Función para manejar el evento onClick
  className?: string; // Clase CSS adicional opcional
}

const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  icon,
  onClick,
  className,
}) => {
  return (
    <ButtonStyled className={className} onClick={onClick}>
      {children}
      {icon && (
        <EnterIcon width={30} height={30} style={{ marginLeft: "20px" }} />
      )}
    </ButtonStyled>
  );
};

export default PrimaryButton;
