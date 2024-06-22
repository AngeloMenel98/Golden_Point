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
  value: string | number;
  placeholder?: string;
  maxLength?: number;
  isSmall?: boolean;
  isBig?: boolean;
  icon?: ReactNode;
  error?: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SecondaryInput: React.FC<PrimaryInputProps> = ({
  label,
  id,
  type,
  value,
  placeholder,
  maxLength,
  isSmall,
  isBig,
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
          isSmall={isSmall}
          isBig={isBig}
          placeholder={placeholder}
          hasIconInside={!!icon}
          onChange={onChange}
          hasError={!!error}
        />
      </InputFieldWithIcon>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default SecondaryInput;
