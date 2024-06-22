import styled from "styled-components";
import { black, darkGreen, grayModal, white } from "../../../../utils/colors";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${grayModal};
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
  padding: 1rem 0rem;

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

export const H3Styled = styled.h3`
  color: ${darkGreen};
  margin: 0;
`;
