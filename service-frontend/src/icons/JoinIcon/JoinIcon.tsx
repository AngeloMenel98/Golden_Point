import React from "react";
import { black } from "../../utils/colors";

interface JoinIconProps {
  width: number;
  height: number;
  color?: string;
  onClick?: () => void;
}

const JoinIcon: React.FC<JoinIconProps> = ({
  width,
  height,
  color = black,
  onClick,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <path
        d="M20.8421 8.57143H0V12.8571H20.8421V8.57143ZM20.8421 0H0V4.28571H20.8421V0ZM28.4211 17.1429V8.57143H24.6316V17.1429H17.0526V21.4286H24.6316V30H28.4211V21.4286H36V17.1429H28.4211ZM0 21.4286H13.2632V17.1429H0V21.4286Z"
        fill={color}
      />
    </svg>
  );
};

export default JoinIcon;
