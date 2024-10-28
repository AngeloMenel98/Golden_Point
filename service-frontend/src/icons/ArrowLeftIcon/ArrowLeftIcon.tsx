import React from "react";
import { black } from "../../utils/colors";

interface IconProps {
  width: number;
  height: number;
  color?: string;
  onClick?: () => void;
}

const ArrowLeftIcon: React.FC<IconProps> = ({
  width,
  height,
  color = black,
  onClick,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 27"
      fill="none"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.3571 25.9635C28.186 25.0322 28.186 23.5278 27.3571 22.5965L19.1324 13.331L27.3784 4.06557C28.2072 3.13425 28.2072 1.62981 27.3784 0.69849C26.5495 -0.23283 25.2106 -0.23283 24.3818 0.69849L14.6269 11.6594C13.7981 12.5907 13.7981 14.0952 14.6269 15.0265L24.3818 25.9874C25.1894 26.8949 26.5283 26.8949 27.3571 25.9635Z"
        fill={color}
      />
      <path
        d="M13.3518 25.9635C14.1806 25.0322 14.1806 23.5278 13.3518 22.5965L5.12714 13.331L13.3731 4.06557C14.2019 3.13425 14.2019 1.62981 13.3731 0.69849C12.5442 -0.23283 11.2053 -0.23283 10.3765 0.69849L0.621632 11.6594C-0.207211 12.5907 -0.207211 14.0952 0.621632 15.0265L10.3765 25.9874C11.1841 26.8949 12.523 26.8949 13.3518 25.9635Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowLeftIcon;
