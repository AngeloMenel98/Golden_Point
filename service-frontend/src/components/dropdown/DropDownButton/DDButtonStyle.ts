import styled from "styled-components";
import {
  black,
  darkGray,
  darkGreen,
  lightGray,
  pastelGreen,
  white,
} from "../../../utils/colors";

export const ButtonContainer = styled.div`
  display: flex;
  align-items: space-between;
`;

export const Button = styled.button<{ open: boolean }>`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.5rem;
  background-color: ${white};
  border: 2px solid ${(props) => (props.open ? pastelGreen : white)};
  border-radius: 0.5rem;
  box-shadow: 0px 15px 25px ${lightGray};
  cursor: pointer;

  &:hover {
    border-color: ${pastelGreen};
  }
`;

export const ButtonText = styled.span`
  color: ${black};
  justify-content: center;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
`;
