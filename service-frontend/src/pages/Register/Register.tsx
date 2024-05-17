import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import RegisterCard from "./RegisterCard/RegisterCard";
import { CardContainer, MainContainer } from "./RegisterStyle";

import UserAPI, { DataRegister } from "../../services/UserApi";
import { Errors } from "../../errors/Errors";

const userAPI = new UserAPI();

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

  const [fieldErrors, setFieldErrors] = useState<Errors>({});
  const navigate = useNavigate();

  const handleClick = async () => {
    if (data.password !== data.confirmPassword) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: fieldErrors.confirmPassword,
      }));
      return;
    }

    const newUser = await userAPI.register(data);

    if (newUser.fieldErrors) {
      setFieldErrors((prevErrors: any) => ({
        ...prevErrors,
        ...newUser.fieldErrors,
      }));
      return;
    }

    navigate("/");
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
