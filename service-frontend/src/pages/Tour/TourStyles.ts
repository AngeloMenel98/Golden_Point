import styled from "styled-components";
import { white } from "../../utils/colors";

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const NavBarContainer = styled.div`
  flex: 1;
`;

export const TourSection = styled.div`
  flex: 10;
  background-color: ${white};
  width: 100%;
`;

export const ButtonInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  padding: 1rem 5rem;
`;

export const InputContainer = styled.div`
  padding-left: 30rem;
  padding-right: 20rem;
`;
