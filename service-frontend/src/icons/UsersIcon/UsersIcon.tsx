import React from "react";
import { black } from "../../utils/colors";

interface UsersIconProps {
  width: number;
  height: number;
  color?: string;
}

const UsersIcon: React.FC<UsersIconProps> = ({
  width,
  height,
  color = black,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 30"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.4007 15.275C17.1121 14.6977 17.6827 13.9836 18.0738 13.1813C18.4649 12.379 18.6673 11.5071 18.6673 10.625C18.6673 8.9674 17.9649 7.37769 16.7147 6.20558C15.4645 5.03348 13.7688 4.375 12.0007 4.375C10.2325 4.375 8.53685 5.03348 7.28661 6.20558C6.03636 7.37769 5.33398 8.9674 5.33398 10.625C5.33397 11.5071 5.53639 12.379 5.92749 13.1813C6.31858 13.9836 6.88921 14.6977 7.60065 15.275C5.73417 16.0674 4.1506 17.3469 3.03929 18.9607C1.92798 20.5744 1.33595 22.4541 1.33398 24.375C1.33398 24.7065 1.47446 25.0245 1.72451 25.2589C1.97456 25.4933 2.3137 25.625 2.66732 25.625C3.02094 25.625 3.36008 25.4933 3.61013 25.2589C3.86018 25.0245 4.00065 24.7065 4.00065 24.375C4.00065 22.3859 4.84351 20.4782 6.3438 19.0717C7.84409 17.6652 9.87892 16.875 12.0007 16.875C14.1224 16.875 16.1572 17.6652 17.6575 19.0717C19.1578 20.4782 20.0007 22.3859 20.0007 24.375C20.0007 24.7065 20.1411 25.0245 20.3912 25.2589C20.6412 25.4933 20.9804 25.625 21.334 25.625C21.6876 25.625 22.0267 25.4933 22.2768 25.2589C22.5268 25.0245 22.6673 24.7065 22.6673 24.375C22.6654 22.4541 22.0733 20.5744 20.962 18.9607C19.8507 17.3469 18.2671 16.0674 16.4007 15.275V15.275ZM12.0007 14.375C11.2095 14.375 10.4362 14.1551 9.77837 13.743C9.12057 13.331 8.60788 12.7453 8.30513 12.0601C8.00238 11.3748 7.92317 10.6208 8.07751 9.89341C8.23185 9.16598 8.61281 8.4978 9.17222 7.97335C9.73163 7.4489 10.4444 7.09175 11.2203 6.94706C11.9962 6.80236 12.8005 6.87662 13.5314 7.16045C14.2623 7.44428 14.887 7.92493 15.3265 8.54161C15.7661 9.1583 16.0007 9.88332 16.0007 10.625C16.0007 11.6196 15.5792 12.5734 14.8291 13.2767C14.0789 13.9799 13.0615 14.375 12.0007 14.375ZM24.9873 14.775C25.8406 13.8742 26.398 12.7613 26.5924 11.5704C26.7868 10.3795 26.6099 9.16134 26.083 8.0625C25.5561 6.96366 24.7017 6.03099 23.6226 5.37678C22.5435 4.72256 21.2857 4.37468 20.0007 4.375C19.647 4.375 19.3079 4.5067 19.0578 4.74112C18.8078 4.97554 18.6673 5.29348 18.6673 5.625C18.6673 5.95652 18.8078 6.27446 19.0578 6.50888C19.3079 6.7433 19.647 6.875 20.0007 6.875C21.0615 6.875 22.0789 7.27009 22.8291 7.97335C23.5792 8.67661 24.0007 9.63044 24.0007 10.625C23.9988 11.2815 23.813 11.9261 23.4621 12.4943C23.1111 13.0624 22.6072 13.5342 22.0007 13.8625C21.803 13.9694 21.6379 14.1221 21.5211 14.3059C21.4044 14.4898 21.34 14.6986 21.334 14.9125C21.3284 15.1247 21.3806 15.3347 21.4855 15.5228C21.5905 15.7109 21.7448 15.8708 21.934 15.9875L22.454 16.3125L22.6273 16.4C24.2345 17.1146 25.5904 18.245 26.5353 19.6579C27.4802 21.0708 27.9747 22.7074 27.9607 24.375C27.9607 24.7065 28.1011 25.0245 28.3512 25.2589C28.6012 25.4933 28.9404 25.625 29.294 25.625C29.6476 25.625 29.9867 25.4933 30.2368 25.2589C30.4868 25.0245 30.6273 24.7065 30.6273 24.375C30.6382 22.4568 30.1257 20.5678 29.1386 18.8876C28.1515 17.2073 26.7224 15.7916 24.9873 14.775V14.775Z"
        fill={color}
      />
    </svg>
  );
};

export default UsersIcon;