import styled from "styled-components";
import bannerImg from "./GP_WallPaper.svg";
import { h3 } from "../../utils/fontSizes";

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

export const LoginSection = styled.div`
  flex: 2;
  background-position: right top;
  background-repeat: no-repeat;
  background-size: 40%;
  display: flex;
  justify-content: center;
  background-color: #96a259;
`;

export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  position: relative;
`;

export const BannerSection = styled.div`
  //flex: 3;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${bannerImg});
  ${h3}
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column-reverse;

  /* Estilos para el elemento p */
  p {
    padding: 0px 50px 100px 50px;
    color: #000000;
  }
`;

export const GPLogoStyle = styled.div`
  position: relative;
  top: 10%;
  left: 0;
  transform: translateY(-50%);
`;
