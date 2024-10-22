import React from 'react';

interface AddIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const AddIcon: React.FC<AddIconProps> = ({ width = 14, height = 14, className = '' }) => {
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
        d="M2.1 7H7m4.9 0H7m0 0V2.1M7 7v4.9"
      />
    </svg>
  );
};

export default AddIcon;
