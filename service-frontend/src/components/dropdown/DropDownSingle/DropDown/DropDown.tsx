import React, { useState } from "react";
import DropDownButton from "../DropDownButton/DropDownButton";
import DropDownContent from "../DropDownContent/DropDownContent";
import {
  ButtonContainer,
  Container,
  ContentContainer,
  ErrorMessage,
  Label,
} from "./DropDownStyle";
import DropDownItem from "../DropDownItem/DropDownItem";

interface DropDownProps<T extends string | number | boolean> {
  buttonText: React.ReactNode;
  items: T[];
  width: number;
  error: string | undefined;
  onChange: (selectedItem: T) => void;
}

const DropDownUnique = <T extends string | number | boolean>({
  buttonText,
  items,
  width,
  error,
  onChange,
}: DropDownProps<T>) => {
  const [open, setOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const toggleDropDown = () => {
    setOpen((open) => !open);
  };

  const handleItemClick = (item: T) => {
    setSelectedItem(item);
    onChange(item);
    setOpen(false);
  };

  return (
    <Container>
      <ButtonContainer>
        <Label error={!!error}>{buttonText}</Label>
        <DropDownButton
          open={open}
          toggle={toggleDropDown}
          width={width}
          error={error}
        >
          {selectedItem}
        </DropDownButton>
      </ButtonContainer>

      <ContentContainer>
        <DropDownContent open={open} width={width}>
          {items.map((item, index) => (
            <DropDownItem
              key={index}
              onClick={() => handleItemClick(item)}
              selected={selectedItem === item}
              width={width}
            >
              {item.toString()}
            </DropDownItem>
          ))}
        </DropDownContent>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </ContentContainer>
    </Container>
  );
};

export default DropDownUnique;
