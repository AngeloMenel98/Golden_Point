import styled from "styled-components";
import {
  darkGreen,
  red,
  lightGray,
  darkGray,
  pastelGreen,
} from "../../../utils/colors";

export const ButtonStyled = styled.button<{ isDangerous?: boolean }>`
  background-color: ${(props) => (props.isDangerous ? red : darkGreen)};
  padding: 5px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  /* Estilos cuando el botón está activo o enfocado */
  &:hover {
    background-color: ${(props) => (props.isDangerous ? lightGray : darkGreen)};
    color: ${(props) => (props.isDangerous ? red : pastelGreen)};
    border-color: ${(props) => (props.isDangerous ? darkGray : pastelGreen)};
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-left: 5px;
`;
