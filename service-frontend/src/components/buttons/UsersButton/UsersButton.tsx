import React, { ReactNode } from "react";
import { Button, Icon } from "./UsersButtonStyle";
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
    <Button onClick={onClick} isDangerous={isDangerous} hasIcon={!!icon}>
      {/*icon && <Icon>{icon}</Icon>*/}
      {text && text}
    </Button>
  );
};

export default UsersButton;
