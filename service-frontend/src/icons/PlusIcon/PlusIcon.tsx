import React from "react";
import { black } from "../../utils/colors";
import styled from "styled-components";

interface IconProps {
  onClick?: () => void;
}

interface PlusIconProps {
  width: number;
  height: number;
  color?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const IconSVG = styled.svg<IconProps>`
  cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};
`;

const PlusIcon: React.FC<PlusIconProps> = ({
  width,
  height,
  color = black,
  onClick,
  style,
}) => {
  return (
    <IconSVG
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      <path
        d="M15 0C6.7155 0 0 6.7155 0 15C0 23.2845 6.7155 30 15 30C23.2845 30 30 23.2845 30 15C30 6.7155 23.2845 0 15 0ZM22.5 16.5H16.5V22.5H13.5V16.5H7.5V13.5H13.5V7.5H16.5V13.5H22.5V16.5Z"
        fill={color}
      />
    </IconSVG>
  );
};

export default PlusIcon;
