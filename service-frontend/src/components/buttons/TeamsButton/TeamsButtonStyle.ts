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

export const MyButton = styled.button<{
  isDangerousAction?: boolean;
  hasIcon: boolean;
  isSelected: boolean;
}>`
  background-color: ${(props) =>
    props.isDangerousAction ? red : props.isSelected ? darkGreen : white};
  color: ${(props) =>
    props.isDangerousAction
      ? white
      : props.isSelected
      ? pastelGreen
      : darkGreen};
  padding: ${(props) => (props.hasIcon ? "8px" : "8px 20px")};
  border: 2px solid
    ${(props) =>
      props.isDangerousAction
        ? lightRed
        : props.isSelected
        ? pastelGreen
        : darkGreen};
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.isDangerousAction ? lightGray : darkGreen};
    color: ${(props) => (props.isDangerousAction ? red : pastelGreen)};
    border-color: ${(props) =>
      props.isDangerousAction ? darkGray : pastelGreen};
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

export const MyIcon = styled.div`
  padding-top: 5px;
  padding-right: 5px;
`;
