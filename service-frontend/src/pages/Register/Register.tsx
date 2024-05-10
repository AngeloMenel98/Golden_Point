import React, { useState } from "react";
import RegisterCard from "./RegisterCard/RegisterCard";
import { CardContainer, MainContainer } from "./RegisterStyle";
import UserAPI, { DataRegister } from "../../services/UserApi";
import axios from "axios";
import {
  RegisterFieldErrors,
  errorMappings,
} from "../../errors/RegisterErrors";
import { useNavigate } from "react-router-dom";

const userAPI = new UserAPI();

interface RegisterError {
  msg: string;
}

const Register: React.FC = () => {
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

  const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({});
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      if (data.password !== data.confirmPassword) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Las contraseñas no coinciden",
        }));
        return;
      }

      const newUser = await userAPI.register(data);

      navigate("/tour");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data?.errors && e.response.data.errors.length > 0) {
          const errorMessage: RegisterError[] = e.response.data.errors;
          const fieldErrors: RegisterFieldErrors = {};

          errorMessage.forEach((error) => {
            const fieldName = errorMappings[error.msg];
            if (fieldName) {
              fieldErrors[fieldName] = error.msg;
            } else {
              fieldErrors.general = "An unexpected error occurred";
            }
          });
          setFieldErrors(fieldErrors);
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
    <MainContainer>
      <CardContainer>
        <RegisterCard
          data={data}
          onChange={handleChange}
          onClick={handleClick}
          error={fieldErrors}
        />
      </CardContainer>
    </MainContainer>
  );
};

export default Register;
