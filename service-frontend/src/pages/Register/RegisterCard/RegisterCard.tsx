import Card from "../../../components/card/Card";
import SecondaryInput from "../../../components/inputs/SecondaryInput/SecondaryInput";
import { darkGreen, lightGray, white } from "../../../utils/colors";
import {
  H2,
  InputContainer,
  InputGroup,
  MainContainer,
} from "./RegisterCardStyle";
import PrimaryButton from "../../../components/buttons/PrimaryButton/PrimaryButton";
import { DataRegister } from "../../../services/UserApi";
import { RegisterFieldErrors } from "../../../errors/RegisterErrors";

interface RegisterCardProps {
  data: DataRegister;
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: RegisterFieldErrors;
}

const RegisterCard: React.FC<RegisterCardProps> = ({
  data,
  onClick,
  onChange,
  error,
}) => {
  return (
    <MainContainer>
      <Card
        bgColor={white}
        borderColor={darkGreen}
        boxColor={lightGray}
        width={700}
      >
        <H2>Registro</H2>
        <InputGroup>
          <InputContainer>
            <SecondaryInput
              label="Nombre de Usuario:"
              id="username"
              type="text"
              value={data.username}
              width={200}
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
              width={200}
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
              width={200}
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
              width={200}
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
              width={200}
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
              width={200}
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
              width={200}
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
              width={200}
              onChange={onChange}
              error={error.confirmPassword}
            />
          </InputContainer>
        </InputGroup>
        <PrimaryButton text="Registrarse" onClick={onClick} />
      </Card>
    </MainContainer>
  );
};

export default RegisterCard;
