import React from "react";
import { black } from "../../utils/colors";

interface IconProps {
  width: number;
  height: number;
  color?: string;
  onClick?: () => void;
}

const UserCircleIcon: React.FC<IconProps> = ({
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
      style={{ cursor: onClick ? "pointer" : "default", marginTop: "4px" }}
    >
      <path
        d="M15 0C6.71371 0 0 6.71371 0 15C0 23.2863 6.71371 30 15 30C23.2863 30 30 23.2863 30 15C30 6.71371 23.2863 0 15 0ZM15 5.80645C17.9395 5.80645 20.3226 8.18952 20.3226 11.129C20.3226 14.0685 17.9395 16.4516 15 16.4516C12.0605 16.4516 9.67742 14.0685 9.67742 11.129C9.67742 8.18952 12.0605 5.80645 15 5.80645ZM15 26.6129C11.4496 26.6129 8.26814 25.004 6.13911 22.4879C7.27621 20.3468 9.50202 18.871 12.0968 18.871C12.2419 18.871 12.3871 18.8952 12.5262 18.9375C13.3125 19.1915 14.1351 19.3548 15 19.3548C15.8649 19.3548 16.6935 19.1915 17.4738 18.9375C17.6129 18.8952 17.7581 18.871 17.9032 18.871C20.498 18.871 22.7238 20.3468 23.8609 22.4879C21.7319 25.004 18.5504 26.6129 15 26.6129Z"
        fill={color}
      />
    </svg>
  );
};

export default UserCircleIcon;
