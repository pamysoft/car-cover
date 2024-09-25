import React from 'react';

interface CheckedIconProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const CheckedIcon: React.FC<CheckedIconProps> = ({ width = 14, height = 14, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      width={width}
      height={height}
      className={className}
      focusable="false"
      aria-hidden="true"
      stroke='currentColor'
      fill='transparent'
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.1 2.8 6.223 11.643a.35.35 0 0 1-.54.054L1.4 7.4"
      />
    </svg>
  );
};

export default CheckedIcon;
