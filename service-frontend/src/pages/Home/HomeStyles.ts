import styled from "styled-components";
import { white } from "../../utils/colors";

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

export const HomeSection = styled.div`
  margin-top: 74px;
  margin-left: 50px;
  background-color: ${white};
  background-position: right;
  background-repeat: no-repeat;
  background-size: 40%;
  display: flex;
  justify-content: center;
`;
