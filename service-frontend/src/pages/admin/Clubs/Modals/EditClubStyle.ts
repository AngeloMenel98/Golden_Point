import styled from "styled-components";

import { black, darkGreen, grayModal, white } from "../../../../utils/colors";

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
  z-index: 1000;
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

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: rows;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
`;

export const H3 = styled.h3`
  margin: 0;
  font-weight: 650;
  color: ${darkGreen};
`;
