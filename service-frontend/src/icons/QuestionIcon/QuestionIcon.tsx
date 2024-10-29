import React from "react";
import { black } from "../../utils/colors";

interface IconProps {
  width: number;
  height: number;
  color?: string;
}

const QuestionIcon: React.FC<IconProps> = ({
  width,
  height,
  color = black,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20ZM8.914 11.276C8.83 11.836 9.306 12.298 9.872 12.298H10.342C10.4755 12.298 10.6041 12.2471 10.7014 12.1557C10.7987 12.0643 10.8576 11.9393 10.866 11.806C10.923 11.28 11.149 10.82 11.542 10.427L12.172 9.807C12.664 9.312 13.008 8.863 13.205 8.46C13.402 8.051 13.5 7.618 13.5 7.161C13.5 6.156 13.197 5.379 12.591 4.831C11.985 4.277 11.133 4 10.035 4C8.947 4 8.088 4.29 7.455 4.871C7.08031 5.21855 6.80635 5.66076 6.662 6.151C6.478 6.755 7.022 7.282 7.652 7.282C8.186 7.282 8.585 6.847 8.956 6.442C9.008 6.385 9.059 6.328 9.11 6.274C9.344 6.027 9.652 5.904 10.035 5.904C10.843 5.904 11.247 6.358 11.247 7.266C11.247 7.567 11.169 7.855 11.014 8.129C10.859 8.398 10.545 8.75 10.074 9.185C9.608 9.615 9.287 10.054 9.11 10.5C9.023 10.721 8.958 10.98 8.914 11.276ZM8.971 13.887C8.738 14.118 8.621 14.414 8.621 14.774C8.621 15.129 8.735 15.422 8.963 15.654C9.196 15.884 9.502 16 9.88 16C10.258 16 10.56 15.884 10.789 15.653C11.022 15.422 11.139 15.129 11.139 14.774C11.139 14.414 11.019 14.118 10.781 13.887C10.548 13.65 10.247 13.532 9.88 13.532C9.512 13.532 9.21 13.65 8.971 13.887Z"
        fill={color}
      />
    </svg>
  );
};

export default QuestionIcon;
