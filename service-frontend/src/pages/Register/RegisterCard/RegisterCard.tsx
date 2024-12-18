import {
  H2,
  InputContainer,
  InputGroup,
  ButtonContainer,
} from "./RegisterCardStyle";
import { darkGreen, lightGray, white } from "../../../utils/colors";

import Card from "../../../components/card/Card";
import PrimaryButton from "../../../components/buttons/PrimaryButton/PrimaryButton";
import SecondaryInput from "../../../components/inputs/SecondaryInput/SecondaryInput";

import { DataRegister } from "../../../services/UserApi";
import { Errors } from "../../../errors/Errors";

interface RegisterCardProps {
  data: DataRegister;
  onClick: () => void;
  onBack: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: Errors;
}

const RegisterCard: React.FC<RegisterCardProps> = ({
  data,
  onClick,
  onChange,
  onBack,
  error,
}) => {
  return (
    <Card
      backgroundCol={white}
      borderCol={darkGreen}
      boxCol={lightGray}
      mWidth={700}
      mHeight={550}
    >
      <H2>Registro de nuevo usuario</H2>
      <InputGroup>
        <InputContainer>
          <SecondaryInput
            label="Nombre de Usuario:"
            id="username"
            type="text"
            value={data.username}
            onChange={onChange}
            error={error.username}
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
            onChange={onChange}
            error={error.firstName}
          />
        </InputContainer>
        <InputContainer>
          <SecondaryInput
            label="Apellido:"
            id="lastName"
            type="text"
            value={data.lastName}
            onChange={onChange}
            error={error.lastName}
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
            onChange={onChange}
            error={error.phoneNumber}
          />
        </InputContainer>
        <InputContainer>
          <SecondaryInput
            label="Residencia:"
            id="location"
            type="text"
            value={data.location}
            onChange={onChange}
            error={error.location}
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
            onChange={onChange}
            error={error.email}
          />
        </InputContainer>
        <InputContainer>
          <SecondaryInput
            label="Contraseña:"
            id="password"
            type="password"
            value={data.password}
            onChange={onChange}
            error={error.password}
          />
        </InputContainer>
        <InputContainer>
          <SecondaryInput
            label="Confirmar Contraseña:"
            id="confirmPassword"
            type="password"
            value={data.confirmPassword}
            onChange={onChange}
            error={error.confirmPassword}
          />
        </InputContainer>
      </InputGroup>
      <ButtonContainer>
        <PrimaryButton
          text="Volver"
          onClick={onBack}
          isDangerousAction={true}
        />
        <PrimaryButton text="Registrarse" onClick={onClick} />
      </ButtonContainer>
    </Card>
  );
};

export default RegisterCard;
