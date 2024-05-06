import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI, { Credentials } from "../../services/UserApi";
import GPLogo from "../../icons/GPLogo/GPLogo";
import PrimaryButton from "../../components/buttons/PrimaryButton/PrimaryButton";

import {
  MainContainer,
  LoginSection,
  LoginFormContainer,
  BannerSection,
  LabelH2,
  LabelH5,
  StyledLink,
  ForgotPasswordContainer,
} from "./LoginStyles";
import PrimaryInput from "../../components/inputs/PrimaryInput/PrimaryInput";
import EnterIcon from "../../icons/EnterIcon/EnterIcon";

const userAPI = new UserAPI();

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const handleClick = async () => {
    try {
      const token = await userAPI.login(credentials);

      localStorage.setItem("token", token);

      navigate("/tour");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data?.error && e.response.data.error.length > 0) {
          const errorMessage: string = e.response.data.error[0].msg;
          setError(errorMessage);
          console.error("Login failed", errorMessage);
        } else {
          setError("An unexpected error occurred.");
          console.error("Login failed - unexpected error");
        }
      }
    }
  };

  return (
    <MainContainer>
      <BannerSection>
        <p>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y
          archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de
          las industrias desde el año 1500, cuando un impresor.
        </p>
      </BannerSection>
      <LoginSection>
        <LoginFormContainer>
          <GPLogo width={200} height={100} />
          <LabelH2>Iniciar Sesión</LabelH2>
          <LabelH5>
            ¿No tienes una cuenta?
            <StyledLink to="/register">Registrate</StyledLink>
          </LabelH5>

          <PrimaryInput
            label="Nombre de usuario"
            id="username"
            type="text"
            value={credentials.username}
            maxLength={20}
            onChange={handleChange}
          />
          <PrimaryInput
            label="Contraseña"
            id="password"
            type="password"
            value={credentials.password}
            maxLength={20}
            onChange={handleChange}
          />

          <ForgotPasswordContainer>
            <StyledLink to="/forgot-password">
              ¿Has olvidado tu contraseña?
            </StyledLink>
          </ForgotPasswordContainer>
          <PrimaryButton
            text="Iniciar Sesión"
            onClick={handleClick}
            errorMessage={error}
            icon={
              <EnterIcon
                width={30}
                height={30}
                style={{ marginLeft: "20px" }}
              />
            }
          />
        </LoginFormContainer>
      </LoginSection>
    </MainContainer>
  );
};

export default Login;
