import styled from "styled-components";
import {
  darkGreen,
  lightGray,
  darkGray,
  pastelGreen,
  blue_ish,
  white,
} from "../../../utils/colors";

export const Button = styled.button`
  background-color: transparent;
  color: ${darkGreen};
  padding: 5px 20px;
  border: 2px solid ${darkGreen};
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  /* Estilos cuando el botón está activo o enfocado */
  &:hover {
    background-color: ${darkGreen};
    color: ${pastelGreen};
    border-color: ${pastelGreen};
    opacity: 0.8;
  }
  ,
  &:active {
    outline: none;
  }

  /*&:disabled {
    background: ${lightGray};
    color: ${darkGray};
    border: 1px solid ${lightGray};
    cursor: default;
    &:hover {
      opacity: 1;
    }
  }*/
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
