import styled from "styled-components";
import bannerImg from "./GP_WallPaper.jpg";
import { h3 } from "../../utils/fontSizes";
import { pastelGreen, darkGreen, mint } from "../../utils/colors";
import { Link } from "react-router-dom";

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

export const LoginSection = styled.div`
  background-color: ${pastelGreen};
  background-position: right top;
  background-repeat: no-repeat;
  background-size: 40%;
  display: flex;
  justify-content: center;
`;

export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
`;

export const BannerSection = styled.div`
  flex: 1;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${bannerImg});
  ${h3}
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column-reverse;
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
`;

export const StyledLink = styled(Link)`
  color: ${darkGreen};
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  margin-left: 10px;
  transition: 0.3s ease;

  &:hover {
    color: ${mint};
  }
`;

export const ForgotPasswordContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px; /* Ajusta el margen superior según tus necesidades 
`;

export const LoginButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px; /* Ajusta el margen superior según tus necesidades 
`;
