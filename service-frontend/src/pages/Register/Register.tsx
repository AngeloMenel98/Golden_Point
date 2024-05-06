import React from "react";
import RegisterCard from "./RegisterCard/RegisterCard";
import { CardContainer, MainContainer } from "./RegisterStyle";
import UserAPI from "../../services/UserApi";

const userAPI = new UserAPI();

const Register: React.FC = () => {
  return (
    <MainContainer>
      <CardContainer>
        <RegisterCard userApi={userAPI} />
      </CardContainer>
    </MainContainer>
  );
};

export default Register;
