import React from "react";
import styled from "styled-components";
import CheckIcon from "../../icons/CheckIcon/CheckIcon";
import { darkGreen, pastelGreen, red, white } from "../../utils/colors";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const StyledCheckbox = styled.label`
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  border: none;
  position: absolute;
  overflow: hidden;
  cursor: pointer;

  background-color: ${({ checked }) => (checked ? white : pastelGreen)};
  border: 2px solid ${darkGreen};
  border-radius: 4px;
`;

const CheckIconWrapper = styled.div`
  position: absolute;
  top: 3px;
  left: 3px;
`;

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <StyledCheckbox>
      <HiddenCheckbox checked={checked} onChange={handleCheckboxChange} />
      {checked && (
        <CheckIconWrapper>
          <CheckIcon width={18} height={18} color={darkGreen} />
        </CheckIconWrapper>
      )}
    </StyledCheckbox>
  );
};

export default Checkbox;
