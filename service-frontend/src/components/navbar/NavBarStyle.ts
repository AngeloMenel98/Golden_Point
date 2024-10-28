import styled from "styled-components";
import { pastelGreen, white, darkGreen } from "../../utils/colors";

export const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  width: 100%;

  padding: 0.01rem 0.01rem;
  justify-content: space-between;
  background-color: ${pastelGreen};
  color: white;

  @media screen and (max-width: 480px) {
    padding: 0rem;
  }
`;

export const DataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Username = styled.div`
  margin-right: 1rem;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;

  transition: transform 0.3s;
  &:active {
    transform: scale(1.2);
  }

  &:focus {
    backgroud-color: ${white};
  }
`;

export const MenuDropdown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${darkGreen};
  color: white;

  padding: 0.5rem;
`;

export const DropDownButton = styled.button`
  width: 100%;
  background-color: ${darkGreen};
  color: white;
  border: none;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: ${pastelGreen};
    color: ${darkGreen};
    width: 10%;
  }
`;
