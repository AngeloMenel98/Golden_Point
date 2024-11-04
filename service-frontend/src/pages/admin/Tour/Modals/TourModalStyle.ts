import styled from "styled-components";
<<<<<<< HEAD
import { black, darkGreen, grayModal, white } from "../../../../utils/colors";

export const ModalWrapper = styled.div`
=======
import {
  black,
  darkGray,
  darkGreen,
  grayModal,
  pastelGreen,
  white,
} from "../../../../utils/colors";

export const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

>>>>>>> develop
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
<<<<<<< HEAD
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${grayModal};
=======
  background-color: ${grayModal};
  z-index: 1000;
>>>>>>> develop
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalContent = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  flex: 1;

  background-color: ${white};
  padding: 1rem;

  border: 3px solid ${darkGreen};
  border-radius: 8px;

  box-shadow: 0 2px 4px ${black};
  max-width: ${(props) => props.width}rem;
`;

export const ClubContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.5rem 0rem;

  margin: 0.5rem 0rem;
  border: 2px solid ${darkGreen};
  border-radius: 10px;

  @media screen and (max-width: 900px) {
    padding: 0.5rem;
  }
`;

export const LeftContainer = styled.div`
  padding: 0rem 1rem;

  @media screen and (max-width: 900px) {
    padding: 0.5rem;
  }
`;
export const RightContainer = styled.div`
  padding: 0rem 1rem;

  @media screen and (max-width: 900px) {
    padding: 0.5rem;
  }
`;

export const FullRightContainer = styled.div`
  padding: 0rem 1rem;
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonSection = styled.div`
  padding: 1rem;
`;

<<<<<<< HEAD
export const H3Styled = styled.h3`
  color: ${darkGreen};
  margin: 0;
`;
=======
export const H3 = styled.h3`
  color: ${darkGreen};
  margin: 0;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const H4 = styled.h4`
  color: ${darkGreen};
  margin: 0;
  text-decoration: underline;
`;

export const Note = styled.span`
  display: flex;
  justify-content: flex-end;
  color: ${darkGreen};
  margin: 0;
`;

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;

  &:hover .tooltip {
    visibility: visible;
    opacity: 0.95;
  }
`;

export const TooltipText = styled.span`
  visibility: hidden;
  opacity: 0;
  width: 200px;
  background-color: ${darkGray};
  color: ${white};
  text-align: center;
  border-radius: 8px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 65%;
  transform: translateX(-50%);
  transition: opacity 0.3s;

  /* Flecha del tooltip */
  &:after {
    content: "";
    position: absolute;
    top: 100%; /* Ubicación en la parte inferior del tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${darkGray} transparent transparent transparent;
  }
`;

export const IconContainer = styled.span`
  margin-left: 8px;
  color: gray;
  cursor: pointer;
`;

export const NoteStyled = styled.p`
  display: flex;
  justify-content: flex-end;

  font-size: 0.8rem;
  color: ${pastelGreen};
  margin: 4px 0px;
`;
>>>>>>> develop
