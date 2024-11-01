import React from "react";
import { black } from "../../utils/colors";
import { IconProps } from "../../utils/interfaces";

const ChevronDownIcon: React.FC<IconProps> = ({
  width,
  height,
  color = black,
  onClick,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.9475 13.4034C15.4617 13.8938 14.6703 13.8976 14.1798 13.4118L10.0441 9.31535L5.94765 13.4511C5.46183 13.9415 4.67038 13.9453 4.1799 13.4595C3.68942 12.9737 3.68565 12.1822 4.17147 11.6917L9.14757 6.66795C9.63339 6.17747 10.4248 6.1737 10.9153 6.65952L15.9391 11.6356C16.4296 12.1214 16.4334 12.9129 15.9475 13.4034Z"
        fill={color}
      />
    </svg>
  );
};

export default ChevronDownIcon;
