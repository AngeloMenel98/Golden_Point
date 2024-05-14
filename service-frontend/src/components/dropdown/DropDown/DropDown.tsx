import React, { useState } from "react";
import DropDownButton from "../DropDownButton/DropDownButton";
import DropDownContent from "../DropDownContent/DropDownContent";
import { ButtonContainer, Container, ContentContainer } from "./DropDownStyle";

interface DropDownProps {
  buttonText: React.ReactNode;
  content: React.ReactNode;
}
const DropDown = ({ buttonText, content }: DropDownProps) => {
  const [open, setOpen] = useState(false);

  const toggleDropDown = () => {
    setOpen((open) => !open);
  };

  return (
    <Container>
      <ButtonContainer>
        <DropDownButton open={open} toggle={toggleDropDown}>
          {buttonText}
        </DropDownButton>
      </ButtonContainer>

      <ContentContainer>
        <DropDownContent open={open}>{content}</DropDownContent>
      </ContentContainer>
    </Container>
  );
};

export default DropDown;
