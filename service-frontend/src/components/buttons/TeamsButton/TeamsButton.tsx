import React, { ReactNode } from "react";
import { MyButton, MyIcon } from "./TeamsButtonStyle";
import { TeamDTO } from "../../../entities/dtos/TeamDTO";

interface ButtonProps {
  team: TeamDTO;
  text?: string;
  icon?: ReactNode;
  isDangerous?: boolean;
  onClick: (team: TeamDTO) => void;
  isSelected: boolean;
}

const TeamsButton: React.FC<ButtonProps> = ({
  team,
  text,
  icon,
  isDangerous,
  onClick,
  isSelected,
}) => {
  return (
    <MyButton
      onClick={() => onClick(team)}
      isDangerousAction={isDangerous}
      hasIcon={!!icon}
      isSelected={isSelected}
    >
      {icon && <MyIcon>{icon}</MyIcon>}
      {text && text}
    </MyButton>
  );
};

export default TeamsButton;
