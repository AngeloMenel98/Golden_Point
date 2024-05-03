import { useState } from "react";
import MenuIcon from "../../icons/MenuIcon/MenuIcon";
import { darkGreen, white } from "../../utils/colors";
import GPLogo from "../../icons/GPLogo/GPLogo";
import {
  IconsContainer,
  LogoContainer,
  MenuDropdown,
  NavbarContainer,
  StyledButton,
  Username,
} from "./NavBarStyle";

interface NavBarProps {
  userName: string;
}

const NavBar: React.FC<NavBarProps> = ({ userName }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <NavbarContainer>
        <LogoContainer>
          <GPLogo width={100} height={50} />
        </LogoContainer>
        <IconsContainer>
          <Username>{userName}</Username>
          <StyledButton
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <MenuIcon
              width={40}
              height={41}
              onClick={toggleMenu}
              color={isHovered ? darkGreen : white}
            />
          </StyledButton>
        </IconsContainer>
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
