import React from "react";
import styled, { keyframes } from "styled-components";
import { darkGreen, pastelGreen } from "../../utils/colors";

// Animación para hacer que los círculos se muevan de arriba a abajo
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
  }
`;

// Contenedor general para el spinner y el texto
const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Contenedor para los círculos
const Spinner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50px;
  margin-bottom: 10px;
`;

// Estilo para cada círculo
const Circle = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${pastelGreen};
  border-radius: 50%;
  animation: ${bounce} 0.8s ease-in-out infinite;

  &:nth-child(1) {
    animation-delay: 0s;
  }

  &:nth-child(2) {
    animation-delay: 0.15s;
  }

  &:nth-child(3) {
    animation-delay: 0.3s;
  }

  &:nth-child(4) {
    animation-delay: 0.45s;
  }
`;

// Estilo para el texto que se muestra debajo del spinner
const LoadingText = styled.p`
  font-size: 16px;
  color: ${darkGreen};
  text-align: center;

  padding-top: 0.5rem;
`;

interface BouncingCirclesProps {
  text: string;
}

const BouncingCircles: React.FC<BouncingCirclesProps> = ({ text }) => {
  return (
    <SpinnerContainer>
      <Spinner>
        <Circle />
        <Circle />
        <Circle />
        <Circle />
      </Spinner>
      <LoadingText>Esperando {text}</LoadingText>
    </SpinnerContainer>
  );
};

export default BouncingCircles;
