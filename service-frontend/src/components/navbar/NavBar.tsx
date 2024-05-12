import { useState } from "react";
import MenuIcon from "../../icons/MenuIcon/MenuIcon";
import { darkGreen, white } from "../../utils/colors";
import GPLogo from "../../icons/GPLogo/GPLogo";
import {
  IconsContainer,
  LogoContainer,
  MenuDropdown,
  NavbarContainer,
  IconButton,
  Username,
  DropDownButton,
} from "./NavBarStyle";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../reduxSlices/user/userSlice";

interface NavBarProps {
  userName: string | undefined;
}

const NavBar: React.FC<NavBarProps> = ({ userName }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(logOutUser());

    navigate("/");
  };

  return (
    <>
      <NavbarContainer>
        <LogoContainer>
          <GPLogo width={100} height={50} />
        </LogoContainer>
        <IconsContainer>
          <Username>{userName}</Username>
          <IconButton
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <MenuIcon
              width={40}
              height={41}
              onClick={toggleMenu}
              color={isHovered ? darkGreen : white}
            />
          </IconButton>
        </IconsContainer>
      </NavbarContainer>
      {menuOpen && (
        <MenuDropdown>
          {/* Aquí puedes agregar los elementos del menú */}
          <div>Elemento 1</div>
          <div>Elemento 2</div>
          <DropDownButton onClick={handleLogOut}>Log Out</DropDownButton>
        </MenuDropdown>
      )}
    </>
  );
};

export default NavBar;
