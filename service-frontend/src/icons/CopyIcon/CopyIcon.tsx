import React from "react";
import { black } from "../../utils/colors";
import { IconProps } from "../../utils/interfaces";

const CopyIcon: React.FC<IconProps> = ({
  width,
  height,
  color = black,
  onClick,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default", marginLeft: "8px" }}
    >
      <path
        d="M21.1765 36H3.52941V10C3.52941 8.9 2.73529 8 1.76471 8C0.794118 8 0 8.9 0 10V36C0 38.2 1.58824 40 3.52941 40H21.1765C22.1471 40 22.9412 39.1 22.9412 38C22.9412 36.9 22.1471 36 21.1765 36ZM30 28V4C30 1.8 28.4118 0 26.4706 0H10.5882C8.64706 0 7.05882 1.8 7.05882 4V28C7.05882 30.2 8.64706 32 10.5882 32H26.4706C28.4118 32 30 30.2 30 28ZM26.4706 28H10.5882V4H26.4706V28Z"
        fill={color}
      />
    </svg>
  );
};

export default CopyIcon;
