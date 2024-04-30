import { useState } from "react";
import styled from "styled-components";
import GPLogo from "../../icons/GPLogo/GPLogo";
import MenuIcon from "../../icons/MenuIcon/MenuIcon";
import {
  darkGray,
  darkGreen,
  pastelGreen,
  red,
  white,
  yellow,
} from "../../utils/colors";

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  padding: 0.5rem 1rem;
  background-color: ${pastelGreen};
  color: white;
  z-index: 1000; /* Ajusta el valor según sea necesario */
`;

const Username = styled.div`
  margin-right: 0.1rem;
`;

const MenuDropdown = styled.div`
  position: fixed;
  top: 4rem; /* Ajusta la posición del dropdown según sea necesario */
  right: 0; /* Ajusta la posición del dropdown según sea necesario */
  width: 300px; /* Ancho del menú */
  background-color: ${darkGray};
  color: white;
  z-index: 999; /* Ajusta el valor según sea necesario */
  padding: 20px;
`;

const StyledButton = styled.button`
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

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <NavbarContainer>
        <GPLogo width={100} height={50} />

        <Username>User</Username>
        <StyledButton
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <MenuIcon
            width={40}
            height={41}
            onClick={toggleMenu}
            color={isHovered ? red : white}
          />
        </StyledButton>
      </NavbarContainer>
      {menuOpen && (
        <MenuDropdown>
          {/* Aquí puedes agregar los elementos del menú */}
          <div>Elemento 1</div>
          <div>Elemento 2</div>
          <div>Elemento 3</div>
          {/* ... */}
        </MenuDropdown>
      )}
    </>
  );
};

export default NavBar;
