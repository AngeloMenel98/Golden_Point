import React from "react";
import { black } from "../../utils/colors";
import { IconProps } from "../../utils/interfaces";

const EnterIcon: React.FC<IconProps> = ({ width, height, color = black }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_246_1095)">
        <path
          d="M13.75 8.75L12 10.5L15.25 13.75H2.5V16.25H15.25L12 19.5L13.75 21.25L20 15L13.75 8.75ZM25 23.75H15V26.25H25C26.375 26.25 27.5 25.125 27.5 23.75V6.25C27.5 4.875 26.375 3.75 25 3.75H15V6.25H25V23.75Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_246_1095">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default EnterIcon;
