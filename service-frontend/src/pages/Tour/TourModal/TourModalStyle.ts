import styled from "styled-components";
import { black, darkGreen, grayModal, white } from "../../../utils/colors";

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

export const ModalContent = styled.div<{ width: number; height: number }>`
  background-color: ${white};
  padding: 20px;

  border: 3px solid ${darkGreen};
  border-radius: 8px;

  box-shadow: 0 2px 4px ${black};
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  overflow-y: auto;
`;

export const ClubContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0rem;
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
