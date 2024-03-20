import { useState } from "react";
import { setUserToken } from "../../features/users/userSlice";
import { useLoginUserMutation } from "../../features/users/userApiSlice";

import wallPaperGP from "./GP_WallPaper.svg";
import { useDispatch } from "react-redux";
/*const MainContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-grow: 1;
`;

const BannerSection = styled.div`
    flex: 1;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(${wallPaperGP});
    ${h3}
    color: white;
    text-align: center;
    display: flex;
    flex-direction: column-reverse;
    p {
        padding: 0px 50px 100px 50px;
    }
`;

const LoginSection = styled.div`
    flex: 2;
    background-position: right top;
    background-repeat: no-repeat;
    background-size: 40%;
    display: flex;
    justify-content: center;
`;

const LoginFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
`;

const Form = styled.form`
    width: 100%;
    margin-top: 4rem;
    text-align: left;
    display: flex;
    flex-direction: column;
`;*/

export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const [loginUser] = useLoginUserMutation();

  const handleLogin = async () => {
    try {
      const result = await loginUser({ username, password });
      if ("data" in result && result.data) {
        dispatch(setUserToken(result.data.token));
      }
    } catch (error) {
      setError("Error en el inicio de sesión. Verifique sus credenciales.");
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      {error && <p>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};
