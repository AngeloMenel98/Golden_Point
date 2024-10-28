import styled from "styled-components";
import {
  black,
  darkGreen,
  grayModal,
  white,
} from "../../../../../utils/colors";

export const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${grayModal};
  z-index: 1001;
`;

export const ModalContent = styled.div<{ width: number; height: number }>`
  display: flex;
  flex-direction: column;
  flex: 1;

  background-color: ${white};
  padding: 1rem;

  border: 3px solid ${darkGreen};
  border-radius: 8px;

  box-shadow: 0 2px 4px ${black};
  max-width: ${(props) => props.width}rem;
  max-height: ${(props) => props.width}rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
`;

export const ButtonSection = styled.div`
  padding: 1rem;
`;

export const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SetContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 3.4rem;
`;

export const H3Styled = styled.h3`
  color: ${darkGreen};
  margin: 0;
`;

export const Span = styled.span`
  color: ${darkGreen};
  font-weight: 500;
  margin: 0;
`;
