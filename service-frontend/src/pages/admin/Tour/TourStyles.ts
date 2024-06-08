import styled from "styled-components";
import { darkGreen, white } from "../../../utils/colors";

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 95%;
  }

  @media (max-width: 480px) {
    width: 90%;
  }
`;

export const NavBarContainer = styled.div`
  flex: 1;
`;

export const TourSection = styled.div`
  flex: 10;
  background-color: ${white};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ButtonInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 500px;
`;

export const InputContainer = styled.div`
  padding-top: 10px;
  padding-left: 500px;
  padding-right: 10px;
`;

export const H2 = styled.h2`
  color: ${darkGreen};
  padding: 0.01rem 3rem;
`;
