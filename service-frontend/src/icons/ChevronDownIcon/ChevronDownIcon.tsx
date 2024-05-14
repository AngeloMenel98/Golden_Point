import React from "react";
import { black } from "../../utils/colors";

interface ChevronDownIconProps {
  width: number;
  height: number;
  color?: string;
  onClick?: () => void;
}

const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({
  width,
  height,
  color = black,
  onClick,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.11612 6.61612C4.60427 6.12796 5.39573 6.12796 5.88388 6.61612L10 10.7322L14.1161 6.61612C14.6043 6.12796 15.3957 6.12796 15.8839 6.61612C16.372 7.10427 16.372 7.89573 15.8839 8.38388L10.8839 13.3839C10.3957 13.872 9.60427 13.872 9.11612 13.3839L4.11612 8.38388C3.62796 7.89573 3.62796 7.10427 4.11612 6.61612Z"
        fill={color}
      />
    </svg>
  );
};

export default ChevronDownIcon;
