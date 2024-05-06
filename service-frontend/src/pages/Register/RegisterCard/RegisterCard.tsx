import { useState } from "react";
import Card from "../../../components/card/Card";
import SecondaryInput from "../../../components/inputs/SecondaryInput/SecondaryInput";
import { darkGreen, white } from "../../../utils/colors";
import { H2, InputContainer, InputGroup } from "./RegisterCardStyle";
import PrimaryButton from "../../../components/buttons/PrimaryButton/PrimaryButton";
import axios from "axios";
import UserAPI, { DataRegister } from "../../../services/UserApi";

interface RegisterCardProps {
  userApi: UserAPI;
}

const RegisterCard: React.FC<RegisterCardProps> = ({ userApi }) => {
  const [data, setData] = useState<DataRegister>({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      if (data.password !== data.confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      const newUser = await userApi.register(data);

      console.log(newUser);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data?.error && e.response.data.error.length > 0) {
          const errorMessage: string = e.response.data.error[0].msg;
          setError(errorMessage);
          console.error("Login failed", errorMessage);
        } else {
          setError("An unexpected error occurred.");
          console.error(error);
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "password" || e.target.id === "confirmPassword") {
      setData({ ...data, [e.target.id]: e.target.value });
    } else {
      setData({ ...data, [e.target.id]: e.target.value });
    }
  };
  return (
    <Card bgColor={white} borderColor={darkGreen} width={750}>
      <H2>Registro</H2>
      <InputGroup>
        <InputContainer>
          <SecondaryInput
            label="Nombre de Usuario:"
            id="username"
            type="text"
            value={data.username}
            width={200}
            onChange={handleChange}
          />
        </InputContainer>
      </InputGroup>

      <InputGroup>
        <InputContainer>
          <SecondaryInput
            label="Nombre:"
            id="firstName"
            type="text"
            value={data.firstName}
            width={200}
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <SecondaryInput
            label="Apellido:"
            id="lastName"
            type="text"
            value={data.lastName}
            width={200}
            onChange={handleChange}
          />
        </InputContainer>
      </InputGroup>

      <InputGroup>
        <InputContainer>
          <SecondaryInput
            label="N° Teléfono:"
            id="phoneNumber"
            type="text"
            value={data.phoneNumber}
            width={200}
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <SecondaryInput
            label="Residencia:"
            id="location"
            type="text"
            value={data.location}
            width={200}
            onChange={handleChange}
          />
        </InputContainer>
      </InputGroup>

      <InputGroup>
        <InputContainer>
          <SecondaryInput
            label="Email:"
            id="email"
            type="email"
            value={data.email}
            width={200}
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <SecondaryInput
            label="Contraseña:"
            id="password"
            type="password"
            value={data.password}
            width={200}
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <SecondaryInput
            label="Confirmar Contraseña:"
            id="confirmPassword"
            type="password"
            value={data.confirmPassword}
            width={200}
            onChange={handleChange}
          />
        </InputContainer>
      </InputGroup>
      <PrimaryButton text="Registrarse" onClick={handleClick} />
    </Card>
  );
};

export default RegisterCard;
