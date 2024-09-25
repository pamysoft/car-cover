import React from 'react';

interface ArrowUpIconProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const ArrowUpIcon: React.FC<ArrowUpIconProps> = ({ width = 14, height = 14, className }) => {
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
        d="M2.1 8.4 6.753 3.747a.35.35 0 0 1 .495 0L11.9 8.4"
      />
    </svg>
  );
};

export default ArrowUpIcon;
