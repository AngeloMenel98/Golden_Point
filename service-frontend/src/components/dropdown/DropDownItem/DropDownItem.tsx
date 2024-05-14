import React from "react";
import { Container } from "./DDItemStyle";

interface DropDownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const DropDownItem = ({ children, onClick }: DropDownItemProps) => {
  return <Container onClick={onClick}>{children}</Container>;
};

export default DropDownItem;
