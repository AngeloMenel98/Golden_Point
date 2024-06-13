import React, { ReactNode } from "react";
import { MyButton, MyIcon } from "./UsersButtonStyle";
import { UserDTO } from "../../../entities/dtos/UserDTO";

interface ButtonProps {
  user: UserDTO;
  text?: string;
  icon?: ReactNode;
  isDangerous?: boolean;
  onClick?: () => void;
}

const UsersButton: React.FC<ButtonProps> = ({
  text,
  icon,
  isDangerous,
  onClick,
}) => {
  return (
    <MyButton
      onClick={onClick}
      isDangerousAction={isDangerous}
      hasIcon={!!icon}
    >
      {icon && <MyIcon>{icon}</MyIcon>}
      {text && text}
    </MyButton>
  );
};

export default UsersButton;
