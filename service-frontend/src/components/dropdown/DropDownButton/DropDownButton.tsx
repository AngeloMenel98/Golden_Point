import React from "react";
import ChevronDownIcon from "../../../icons/ChevronDownIcon/ChevronDownIcon";
import { Button, ButtonContainer, ButtonText, Icon } from "./DDButtonStyle";
import ChevronUpIcon from "../../../icons/ChevronUpIcon/ChevronUpIcon";
import { darkGreen } from "../../../utils/colors";

interface DropDownButtonProps {
  children: React.ReactNode;
  open: boolean;
  toggle: () => void;
}

function DropDownButton({ children, open, toggle }: DropDownButtonProps) {
  return (
    <ButtonContainer>
      <Button onClick={toggle} open={open}>
        <ButtonText>{children}</ButtonText>
        <Icon>
          {open ? (
            <ChevronUpIcon width={20} height={20} color={darkGreen} />
          ) : (
            <ChevronDownIcon width={20} height={20} color={darkGreen} />
          )}
        </Icon>
      </Button>
    </ButtonContainer>
  );
}

export default DropDownButton;