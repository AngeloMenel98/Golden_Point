import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MainContainer,
  LoginSection,
  LoginFormContainer,
  BannerSection,
  GPLogoStyle,
} from "./LoginStyles";
import UserAPI from "../../services/UserApi";
import GPLogo from "../../icons/GPLogo/GPLogo";
import PrimaryButton from "../../components/buttons/PrimaryButton/PrimaryButton";
//import GPWallPaper from "../../icons/GPWallPaper/GPWallPaper";

const userAPI = new UserAPI();

interface Credentials {
  username: string;
  password: string;
}

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
      await userAPI.login(credentials);

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
      <LoginSection>
        <LoginFormContainer>
          <GPLogoStyle>
            <GPLogo width={300} height={300} />
          </GPLogoStyle>

          <h3 style={{ color: "#3D4F58" }}>Ingrese a su cuenta</h3>
          <span className="l-span-da" style={{ color: "#3D4F58" }}>
            ¿No tienes una cuenta?{" "}
            <span className="l-span-su">Registrarse</span>
          </span>
          <div>
            <span>Nombre de usuario</span>
            <input
              type="text"
              id="username"
              value={credentials.username}
              onChange={handleChange}
            />
          </div>
          <div className="l-input-2">
            <span className="l-span" style={{ color: "#3D4F58" }}>
              Contraseña
            </span>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
            />
            <span className="l-span-fp">¿Has olvidado tu contraseña?</span>
          </div>

          <div className="eContainer">{error && <span>{error}</span>}</div>
          <PrimaryButton onClick={handleClick} icon="true">
            Iniciar Sesión
          </PrimaryButton>
        </LoginFormContainer>
      </LoginSection>

      <BannerSection>
        <p>
          Sistema de gestión de torneos de Padel para todas las categorias a lo
          largo de todo el año a pedido del señor Nestor Cholo Diaz
        </p>
      </BannerSection>
    </MainContainer>
  );
};

export default Login;
