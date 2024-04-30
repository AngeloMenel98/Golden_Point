import styled from "styled-components";
import bannerImg from "./padel_app.jpg";
import { h3 } from "../../utils/fontSizes";
import { black, pastelGreen, darkGreen } from "../../utils/colors";
import { Link } from "react-router-dom";

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
  background-color: ${pastelGreen};
  }
`;

export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50rem;
  margin: 0 auto;
  position: relative;
`;

export const BannerSection = styled.div`
  width: 100%;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  //background-image: url(${bannerImg});
  ${h3}
  text-align: center;
  display: flex;
  flex-direction: column-reverse;
  padding-left: 500px;

  p {
    padding: 0px 1%;
    color: ${black};
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

export const GPLogoStyle = styled.div`
  position: relative;
  top: 10%;
  left: 0;
  transform: translateY(-60%);
`;

export const LabelH2 = styled.h2`
  display: block;
  margin-bottom: 5px;
  color: ${darkGreen};
`;

export const LabelH5 = styled.h5`
  display: block;
  margin-bottom: 5px;
  color: ${darkGreen};
  font-weight: bold;

  a {
    font-family: "Trebuchet MS";
    //font-style: italic;
    color: ${black};
  }
`;

export const StyledLink = styled(Link)`
  color: blue;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  margin-left: 10px;
`;

export const ForgotPasswordContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px; /* Ajusta el margen superior según tus necesidades */
`;
