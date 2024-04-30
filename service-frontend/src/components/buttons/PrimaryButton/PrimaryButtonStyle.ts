import styled from "styled-components";
import { darkGreen, red, lightGray, darkGray } from "../../../utils/colors";

export const ButtonStyled = styled.button<{ isDangerousAction?: boolean }>`
  background-color: ${(props) => (props.isDangerousAction ? red : darkGreen)};
  padding: 5px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  /* Estilos cuando el botón está activo o enfocado */
  &:hover {
    background-color: #608259;
    opacity: 0.8;
  }
  ,
  &:active {
    outline: none;
  }

  &:disabled {
    background: ${lightGray};
    color: ${darkGray};
    border: 1px solid ${lightGray};
    cursor: default;
    &:hover {
      opacity: 1;
    }
  }
`;
