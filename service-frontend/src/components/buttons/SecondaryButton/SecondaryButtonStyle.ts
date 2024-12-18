import styled from "styled-components";
import {
  darkGreen,
  lightGray,
  darkGray,
  pastelGreen,
  red,
  white,
  lightRed,
} from "../../../utils/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button<{
  isDangerous?: boolean;
  hasIcon: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => (props.isDangerous ? red : "transparent")};
  color: ${(props) => (props.isDangerous ? white : darkGreen)};
  padding: ${(props) => (props.hasIcon ? "8px" : "8px 20px")};
  border: 2px solid ${(props) => (props.isDangerous ? lightRed : darkGreen)};
  border-radius: 6px;
  cursor: pointer;

  transition: background-color 0.3s ease;

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
      opacity: 0.5;
    }
  }
`;
