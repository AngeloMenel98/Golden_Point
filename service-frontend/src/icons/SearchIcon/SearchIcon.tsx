import React from "react";
import { black } from "../../utils/colors";

// Define las propiedades que espera el componente
interface SearchIconProps {
  width: number;
  height: number;
  color?: string;
}

// Define el componente de SVG
const SearchIcon: React.FC<SearchIconProps> = ({
  width,
  height,
  color = black,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.71345 7.13223C2.71345 4.75456 4.62933 2.82708 6.99269 2.82708C9.35605 2.82708 11.2719 4.75456 11.2719 7.13223C11.2719 8.28908 10.8184 9.33937 10.0804 10.1129C10.0573 10.1313 10.0351 10.1511 10.0138 10.1726C9.9925 10.194 9.97277 10.2163 9.95458 10.2395C9.18577 10.9814 8.14215 11.4374 6.99269 11.4374C4.62933 11.4374 2.71345 9.50989 2.71345 7.13223ZM10.5172 11.7535C9.54105 12.5082 8.31895 12.9568 6.99269 12.9568C3.7952 12.9568 1.20312 10.3491 1.20312 7.13223C1.20312 3.91538 3.7952 1.30762 6.99269 1.30762C10.1902 1.30762 12.7823 3.91538 12.7823 7.13223C12.7823 8.46703 12.336 9.69696 11.5853 10.6792L13.8192 12.9266C14.1141 13.2233 14.1141 13.7043 13.8192 14.001C13.5243 14.2977 13.0461 14.2977 12.7512 14.001L10.5172 11.7535Z"
        fill={color}
      />
    </svg>
  );
};

export default SearchIcon;