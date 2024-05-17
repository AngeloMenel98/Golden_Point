import React from "react";
import { black } from "../../utils/colors";

interface OptsIconProps {
  width: number;
  height: number;
  color?: string;
  onClick?: () => void;
}

const OptsIcon: React.FC<OptsIconProps> = ({
  width,
  height,
  color = black,
  onClick,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <path
        d="M23.2258 5.22581C23.2258 8.11452 20.8887 10.4516 18 10.4516C15.1113 10.4516 12.7742 8.11452 12.7742 5.22581C12.7742 2.3371 15.1113 0 18 0C20.8887 0 23.2258 2.3371 23.2258 5.22581ZM30.7742 0C27.8855 0 25.5484 2.3371 25.5484 5.22581C25.5484 8.11452 27.8855 10.4516 30.7742 10.4516C33.6629 10.4516 36 8.11452 36 5.22581C36 2.3371 33.6629 0 30.7742 0ZM5.22581 0C2.3371 0 0 2.3371 0 5.22581C0 8.11452 2.3371 10.4516 5.22581 10.4516C8.11452 10.4516 10.4516 8.11452 10.4516 5.22581C10.4516 2.3371 8.11452 0 5.22581 0Z"
        fill={color}
      />
    </svg>
  );
};

export default OptsIcon;
