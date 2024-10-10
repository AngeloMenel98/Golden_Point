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
} from "./LoginStyles";
import PrimaryInput from "../../components/inputs/PrimaryInput/PrimaryInput";
import EnterIcon from "../../icons/EnterIcon/EnterIcon";
import { Errors } from "../../errors/Errors";
import { white } from "../../utils/colors";
import useSetUser from "../../hooks/useSetUser";

const userAPI = new UserAPI();

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const setUser = useSetUser();

  const handleClick = async () => {
    const token = await userAPI.login(credentials);
    if (token.fieldErrors) {
      setFieldErrors((prevErrors: any) => ({
        ...prevErrors,
        ...token.fieldErrors,
      }));
      return;
    }

    localStorage.setItem("token", token);

    const newUser = setUser;

    navigate("/", { state: { newUser } });
  };

  return (
    <MainContainer>
      <BannerSection />
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
            error={fieldErrors.username}
          />
          <PrimaryInput
            label="Contraseña"
            id="password"
            type="password"
            value={credentials.password}
            maxLength={20}
            onChange={handleChange}
            error={fieldErrors.password}
          />

          {/*<ForgotPasswordContainer>
            <StyledLink to="/forgot-password">
              ¿Has olvidado tu contraseña?
            </StyledLink>
          </ForgotPasswordContainer>*/}
          <PrimaryButton
            text="Iniciar Sesión"
            onClick={handleClick}
            icon={<EnterIcon width={30} height={30} color={white} />}
          />
        </LoginFormContainer>
      </LoginSection>
    </MainContainer>
  );
};

export default Login;
