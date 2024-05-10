import styled from "styled-components";
import { pastelGreen, white, darkGray, darkGreen } from "../../utils/colors";
export const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 99%;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: ${pastelGreen};
  color: white;
  z-index: 1000;
`;

export const LogoContainer = styled.div`
  flex: 1;
`;

export const IconsContainer = styled.div`
  margin-left: auto;
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
  position: fixed;
  top: 4rem;
  right: 0;
  width: 10rem;
  background-color: ${darkGreen};
  color: white;
  z-index: 999;
  padding: 20px;
`;

export const DropDownButton = styled.button`
  width: 100%;
  background-color: ${darkGreen};
  color: white;
  border: none;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: ${pastelGreen};
    color: ${darkGreen};
    width: 100%;
  }
`;
