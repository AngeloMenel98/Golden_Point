import React from "react";
import { black } from "../../utils/colors";

import styled from "styled-components";
import { IconProps } from "../../utils/interfaces";

const IconSVG = styled.svg<IconProps>`
  cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};
`;

const CrossIcon: React.FC<IconProps> = ({
  width,
  height,
  color = black,
  onClick,
}) => {
  return (
    <IconSVG
      width={width}
      height={height}
      viewBox="0 0 27 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      color={black}
    >
      <path
        d="M15.1195 13.7789L21.9998 6.65171C22.4367 6.1992 22.4367 5.52042 21.9998 5.0679C21.563 4.61539 20.9077 4.61539 20.4708 5.0679L13.5905 12.1951L6.71012 5.0679C6.27327 4.61539 5.618 4.61539 5.18115 5.0679C4.7443 5.52042 4.7443 6.1992 5.18115 6.65171L12.0615 13.7789L5.18115 20.906C4.96273 21.1323 4.85352 21.3585 4.85352 21.6979C4.85352 22.3767 5.29036 22.8292 5.94564 22.8292C6.27327 22.8292 6.4917 22.7161 6.71012 22.4898L13.5905 15.3627L20.4708 22.4898C20.6893 22.7161 20.9077 22.8292 21.2353 22.8292C21.563 22.8292 21.7814 22.7161 21.9998 22.4898C22.4367 22.0373 22.4367 21.3585 21.9998 20.906L15.1195 13.7789Z"
        fill={color}
      />
    </IconSVG>
  );
};

export default CrossIcon;
