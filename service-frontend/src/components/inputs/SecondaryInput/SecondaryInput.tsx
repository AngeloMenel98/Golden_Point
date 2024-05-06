import React, { ReactNode } from "react";
import {
  Label,
  InputField,
  IconContainer,
  InputFieldWithIcon,
  InputContainer,
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
}) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
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
        />
      </InputFieldWithIcon>
    </InputContainer>
  );
};

export default SecondaryInput;
