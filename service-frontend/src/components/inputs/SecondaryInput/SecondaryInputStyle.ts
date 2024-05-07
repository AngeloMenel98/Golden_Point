import styled from "styled-components";
import { black, darkGray, darkGreen, red, white } from "../../../utils/colors";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column; /* Hacer que el contenido se muestre en columnas */
`;

export const Label = styled.label<{
  hasError: boolean;
}>`
  font-weight: bold;
  display: block;
  color: ${({ hasError }) => (hasError ? red : darkGreen)};
`;

export const InputFieldWithIcon = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
`;

export const InputField = styled.input<{
  hasIcon: boolean;
  width: number;
  hasError: boolean;
}>`
  width: ${({ width }) => `${width}px`};
  padding: 8px;
  border: 2px solid ${({ hasError }) => (hasError ? red : darkGreen)};
  border-radius: 6px;
  font-size: 1rem;
  color: ${black};
  background-color: ${white};
  transition: box-shadow 0.3s ease;
  padding-left: ${({ hasIcon }) => (hasIcon ? "35px" : "8px")};

  &::placeholder {
    color: ${darkGray};
    opacity: 0.7;
  }

  &:hover {
    box-shadow: 0 0 20px ${({ hasError }) => (hasError ? red : darkGreen)};
  }

  &:focus {
    outline: none;
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  left: 10px;
  top: 55%;
  transform: translateY(-50%);
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.01rem;
  margin-bottom: 0.01rem;
`;
