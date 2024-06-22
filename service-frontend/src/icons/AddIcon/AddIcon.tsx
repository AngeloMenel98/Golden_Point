import React from "react";
import { black } from "../../utils/colors";

interface IconProps {
  width: number;
  height: number;
  color?: string;
  onClick?: () => void;
}

const AddIcon: React.FC<IconProps> = ({
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
        d="M27.8571 11.7857H18.2143V2.14286C18.2143 0.959598 17.2547 0 16.0714 0H13.9286C12.7453 0 11.7857 0.959598 11.7857 2.14286V11.7857H2.14286C0.959598 11.7857 0 12.7453 0 13.9286V16.0714C0 17.2547 0.959598 18.2143 2.14286 18.2143H11.7857V27.8571C11.7857 29.0404 12.7453 30 13.9286 30H16.0714C17.2547 30 18.2143 29.0404 18.2143 27.8571V18.2143H27.8571C29.0404 18.2143 30 17.2547 30 16.0714V13.9286C30 12.7453 29.0404 11.7857 27.8571 11.7857Z"
        fill={color}
      />
    </svg>
  );
};

export default AddIcon;
