import React from "react";
import { black, darkGreen, red, lemonYellow } from "../../utils/colors";

interface CheckIconProps {
  width: number;
  height: number;
  color?: string;
  status?: string;
}

const CalCheckIcon: React.FC<CheckIconProps> = ({
  width,
  height,
  color = black,
  status = "not",
}) => {
  if (status == "pending") {
    color = red;
  }

  if (status == "inProgress") {
    color = lemonYellow;
  }

  if (status == "finish") {
    color = darkGreen;
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 31 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.8047 10.9375H0.820313C0.367295 10.9375 0 10.5702 0 10.1172V7.65625C0 5.84404 1.46904 4.375 3.28125 4.375H6.5625V0.820312C6.5625 0.367295 6.9298 0 7.38281 0H10.1172C10.5702 0 10.9375 0.367295 10.9375 0.820312V4.375H19.6875V0.820312C19.6875 0.367295 20.0548 0 20.5078 0H23.2422C23.6952 0 24.0625 0.367295 24.0625 0.820312V4.375H27.3438C29.156 4.375 30.625 5.84404 30.625 7.65625V10.1172C30.625 10.5702 30.2577 10.9375 29.8047 10.9375ZM0.820313 13.125H29.8047C30.2577 13.125 30.625 13.4923 30.625 13.9453V31.7188C30.625 33.531 29.156 35 27.3438 35H3.28125C1.46904 35 0 33.531 0 31.7188V13.9453C0 13.4923 0.367295 13.125 0.820313 13.125ZM23.6042 19.6839L21.6786 17.7426C21.3596 17.421 20.8402 17.4189 20.5185 17.738L13.2699 24.9283L10.1268 21.7597C9.80773 21.438 9.28826 21.4359 8.96663 21.755L7.02543 23.6807C6.7038 23.9997 6.70168 24.5191 7.02078 24.8408L12.6673 30.533C12.9864 30.8546 13.5058 30.8567 13.8274 30.5376L23.5996 20.8439C23.9212 20.5249 23.9233 20.0055 23.6042 19.6839Z"
        fill={color}
      />
    </svg>
  );
};

export default CalCheckIcon;
