import React from "react";
import { ContentContainer, Text } from "./DDContentStyle";

interface DropDownContentProps {
  children: React.ReactNode;
  open: boolean;
}

function DropDownContent({ children, open }: DropDownContentProps) {
  return (
    <ContentContainer open={open}>
      <Text>{children}</Text>
    </ContentContainer>
  );
}

export default DropDownContent;
