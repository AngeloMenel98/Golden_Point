import styled from "styled-components";
import {
  darkGreen,
  lightRed,
  pastelGreen,
  red,
  white,
} from "../../../../../utils/colors";

export const ModalWrapper = styled.div<{
  open: boolean;
  width: number;
  top: number;
  right: number;
}>`
  position: fixed;
  top: ${({ top }) => top}px;
  right: ${({ right }) => right}px;
  display: ${({ open }) => (open ? "block" : "none")}

  padding: 0.5rem;
  margin-top: 0.5rem;
  background-color: ${white};
  border-radius: 0.5rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  width: ${(props) => props.width}px;
  max-height: 30vh;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  z-index: 1000;

  opacity: ${(props) => (props.open ? 1 : 0)};
  transform: ${(props) => (props.open ? `translateY(0)` : `translateY(-5%)`)};
  transition: transform 150ms ease-in-out;
  opacity 100ms ease-in-out;
  pointer-events: ${(props) => (props.open ? `all` : `none`)};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 3px;
`;

export const MyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding-right: 5px;
`;

export const MyButton = styled.button<{
  isDangerous?: boolean;
  hasIcon: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: transparent;
  color: ${(props) => (props.isDangerous ? red : darkGreen)};
  //padding: ${(props) => (props.hasIcon ? "8px" : "8px 20px")};
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isDangerous ? lightRed : darkGreen)};
    color: ${(props) => (props.isDangerous ? white : pastelGreen)};
    border-color: ${pastelGreen};
    opacity: 0.8;
  }

  &:active {
    outline: none;
  }
`;
