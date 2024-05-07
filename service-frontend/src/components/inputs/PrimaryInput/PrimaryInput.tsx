import React, { ReactNode } from "react";
import {
  InputContainer,
  Label,
  InputField,
  IconContainer,
  InputFieldWithIcon,
} from "./PrimaryInputStyle";

// Definir una interfaz para las props del componente
interface PrimaryInputProps {
  label?: string;
  id: string;
  type: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  icon?: ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PrimaryInput: React.FC<PrimaryInputProps> = ({
  label,
  id,
  type,
  value,
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
          onChange={onChange}
        />
      </InputFieldWithIcon>
    </InputContainer>
  );
};

export default PrimaryInput;
