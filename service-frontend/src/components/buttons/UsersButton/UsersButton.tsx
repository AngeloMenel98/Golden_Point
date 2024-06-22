import React, { ReactNode } from "react";
import { MyButton, MyIcon } from "./UsersButtonStyle";
import { UserDTO } from "../../../entities/dtos/UserDTO";

interface ButtonProps {
  user: UserDTO;
  text?: string;
  icon?: ReactNode;
  isDangerous?: boolean;
  onClick: (player: UserDTO) => void;
  isSelected: boolean;
}

const UsersButton: React.FC<ButtonProps> = ({
  user,
  text,
  icon,
  isDangerous,
  onClick,
  isSelected,
}) => {
  return (
    <MyButton
      onClick={() => onClick(user)}
      isDangerousAction={isDangerous}
      hasIcon={!!icon}
      isSelected={isSelected}
    >
      {icon && <MyIcon>{icon}</MyIcon>}
      {text && text}
    </MyButton>
  );
};

export default UsersButton;
