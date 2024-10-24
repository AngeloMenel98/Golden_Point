import React from "react";
import { ContentContainer, Text } from "./DDContentStyle";

interface DropDownContentProps {
  children: React.ReactNode;
  open: boolean;
  width: number;
}

function DropDownContent({ children, open, width }: DropDownContentProps) {
  return (
    <ContentContainer open={open} width={width}>
      <Text>{children}</Text>
    </ContentContainer>
  );
}

export default DropDownContent;
