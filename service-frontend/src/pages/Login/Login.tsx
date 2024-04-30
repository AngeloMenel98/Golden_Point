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
  GPLogoStyle,
  LabelH2,
  LabelH5,
  StyledLink,
  ForgotPasswordContainer,
} from "./LoginStyles";
import PrimaryInput from "../../components/buttons/PrimaryInput/PrimaryInput";

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

      navigate("/home");
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
          Sistema de gestión de torneos de Padel para todas las categorias a lo
          largo de todo el año a pedido del señor Nestor Cholo Diaz
        </p>
      </BannerSection>
      <LoginSection>
        <LoginFormContainer>
          <GPLogoStyle>
            <GPLogo width={300} height={300} />
          </GPLogoStyle>
          <LabelH2>Ingrese a su Cuenta</LabelH2>
          <LabelH5>
            ¿No tienes una cuenta?
            <StyledLink to="/register">Regístrate</StyledLink>
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
            <LabelH5>
              <StyledLink to="/forgot-password">
                ¿Has olvidado tu contraseña?
              </StyledLink>
            </LabelH5>
          </ForgotPasswordContainer>
          <div>{error && <span>{error}</span>}</div>
          <PrimaryButton onClick={handleClick} icon>
            Iniciar Sesión
          </PrimaryButton>
        </LoginFormContainer>
      </LoginSection>
    </MainContainer>
  );
};

export default Login;
