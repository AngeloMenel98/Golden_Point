import React from "react";
import { InputContainer, Label, InputField } from "./PrimaryInputStyle";

// Definir una interfaz para las props del componente
interface PrimaryInputProps {
  label: string;
  id: string;
  type: string;
  value: string;
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PrimaryInput: React.FC<PrimaryInputProps> = ({
  label,
  id,
  type,
  value,
  maxLength,
  onChange,
}) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <InputField
        type={type}
        id={id}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
      />
    </InputContainer>
  );
};

export default PrimaryInput;
