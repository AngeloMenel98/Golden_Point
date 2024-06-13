import React, { ReactNode } from "react";
import { ButtonStyled, Container, Icon } from "./PrimaryButtonStyle";

interface ButtonProps {
  text?: string;
  icon?: ReactNode;
  isDangerousAction?: boolean;
  onClick?: () => void;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  text,
  icon,
  isDangerousAction,
  onClick,
}) => {
  return (
    <Container>
      <ButtonStyled onClick={onClick} isDangerous={isDangerousAction}>
        {text}
        {icon && <Icon>{icon}</Icon>}
      </ButtonStyled>
    </Container>
  );
};

export default PrimaryButton;
