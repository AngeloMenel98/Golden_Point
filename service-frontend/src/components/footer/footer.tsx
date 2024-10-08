import React from "react";
import styled from "styled-components";
import { pastelGreen, red } from "../../utils/colors";
import CheckIcon from "../../icons/CheckIcon/CheckIcon";

interface FooterProps {
  message: string;
  isSuccess: boolean; // Prop para definir si el estado es exitoso o no
}

interface StyledFooterProps {
  isSuccess: boolean;
}

const StyledFooter = styled.footer<StyledFooterProps>`
  background-color: ${({ isSuccess }) => (isSuccess ? pastelGreen : red)};
  color: white;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  gap: 10px; /* Añade un pequeño espacio entre el ícono y el mensaje */
`;

const Footer: React.FC<FooterProps> = ({ message, isSuccess }) => {
  return (
    <StyledFooter isSuccess={isSuccess}>
      <CheckIcon height={15} width={15} color="white" />
      <div>{message}</div>
    </StyledFooter>
  );
};

export default Footer;
