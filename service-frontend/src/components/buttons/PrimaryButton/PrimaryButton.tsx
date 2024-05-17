import React, { ReactNode } from "react";
import { ButtonStyled, Container, Icon } from "./PrimaryButtonStyle";

interface ButtonProps {
  text?: string;
  icon?: ReactNode;
  isDangerous?: boolean;
  onClick?: () => void;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  text,
  icon,
  isDangerous,
  onClick,
}) => {
  return (
    <Container>
      <ButtonStyled onClick={onClick} isDangerous={isDangerous}>
        {text}
        {icon && <Icon>{icon}</Icon>}
      </ButtonStyled>
    </Container>
  );
};

export default PrimaryButton;
