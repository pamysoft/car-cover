import React from 'react';

interface BackIconProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const BackIcon: React.FC<BackIconProps> = ({ width = 14, height = 14, className }) => {
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
        d="M12.6 7H1.4m0 0 4.9 4.9M1.4 7l4.9-4.9"
      />
    </svg>
  );
};

export default BackIcon;
