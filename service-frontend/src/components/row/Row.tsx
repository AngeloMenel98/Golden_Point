import React from "react";
import styled from "styled-components";
import { white, lightGray, darkGray } from "../../utils/colors";

const BaseRow = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${darkGray};
  margin-bottom: 10px;
  padding: 14px 20px;
  align-items: center;
`;

const LoadingRowContainer = styled(BaseRow)<{ height: number }>`
  height: ${(props) => props.height}px;
`;

const LoadingPlaceholder = styled.div`
  animation-duration: 1.8s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: loadingEffect;
  animation-timing-function: linear;
  border-radius: 5px;
  height: 15px;
  width: 100%;
  background-color: ${lightGray};
  background: linear-gradient(
    90deg,
    ${lightGray} 0%,
    ${white} 50%,
    ${lightGray} 100%
  );
  @keyframes loadingEffect {
    0% {
      background-position: -1036px 0;
    }
    100% {
      background-position: 1036px 0;
    }
  }
`;

interface LoadingRowProps {
  height: number;
}

export const LoadingRow = ({ height }: LoadingRowProps) => (
  <LoadingRowContainer height={height}>
    <LoadingPlaceholder />
  </LoadingRowContainer>
);

export default BaseRow;
