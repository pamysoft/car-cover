import React from 'react';

interface ArrowDownIconProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const ArrowDownIcon: React.FC<ArrowDownIconProps> = ({ width = 14, height = 14, className }) => {
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
        d="M11.9 5.6 7.247 10.253a.35.35 0 0 1-.495 0L2.1 5.6"
      />
    </svg>
  );
};

export default ArrowDownIcon;
