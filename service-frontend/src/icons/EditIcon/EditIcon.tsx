import React from "react";
import { black } from "../../utils/colors";

interface EditIconProps {
  width: number;
  height: number;
  color?: string;
  onClick?: () => void;
}

const EditIcon: React.FC<EditIconProps> = ({
  width,
  height,
  color = black,
  onClick,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <path
        d="M0 24.1008V29.1668C0 29.6334 0.366616 30 0.833218 30H5.89918C6.11582 30 6.33245 29.9167 6.48243 29.75L24.6799 11.5692L18.4308 5.3201L0.249965 23.5009C0.0833219 23.6676 0 23.8675 0 24.1008Z"
        fill={color}
      />
      <path
        d="M29.5126 4.38689L25.6131 0.487432C24.9632 -0.162477 23.9134 -0.162477 23.2634 0.487432L20.2139 3.53701L26.463 9.78614L29.5126 6.73656C30.1625 6.08666 30.1625 5.0368 29.5126 4.38689Z"
        fill={color}
      />
    </svg>
  );
};

export default EditIcon;
