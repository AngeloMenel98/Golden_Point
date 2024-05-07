import React, { ReactNode } from "react";
import {
  Label,
  InputField,
  IconContainer,
  InputFieldWithIcon,
  InputContainer,
  ErrorMessage,
} from "./SecondaryInputStyle";

// Definir una interfaz para las props del componente
interface PrimaryInputProps {
  label?: string;
  id: string;
  type: string;
  value: string;
  width: number;
  placeholder?: string;
  maxLength?: number;
  icon?: ReactNode;
  error?: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SecondaryInput: React.FC<PrimaryInputProps> = ({
  label,
  id,
  type,
  value,
  width,
  placeholder,
  maxLength,
  icon,
  onChange,
  error,
}) => {
  return (
    <InputContainer>
      <Label hasError={!!error}>{label}</Label>
      <InputFieldWithIcon>
        {icon && <IconContainer>{icon}</IconContainer>}
        <InputField
          type={type}
          id={id}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          hasIcon={!!icon}
          width={width}
          onChange={onChange}
          hasError={!!error}
        />
      </InputFieldWithIcon>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default SecondaryInput;
