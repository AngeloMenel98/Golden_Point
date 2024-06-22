import React from "react";
import { Container, Icon } from "./DDItemStyle";
import CheckIcon from "../../../icons/CheckIcon/CheckIcon";
import { darkGreen } from "../../../utils/colors";

interface DropDownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  width: number;
}

const DropDownItem = ({
  children,
  onClick,
  selected,
  width,
}: DropDownItemProps) => {
  return (
    <Container onClick={onClick} width={width - 10}>
      {children}
      <Icon>
        {selected && <CheckIcon width={15} height={15} color={darkGreen} />}
      </Icon>
    </Container>
  );
};

export default DropDownItem;
