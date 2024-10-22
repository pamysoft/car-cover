import React from 'react';

interface LightCloseIconProps {
  width?: string;
  height?: string;
}

const LightCloseIcon: React.FC<LightCloseIconProps> = ({ width = '40', height = '40' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="icon icon-close"
    viewBox="0 0 18 17"
    width={width}
    height={height}
  >
    <path
      fill={'currentColor'}
      d="M.865 15.978a.5.5 0 0 0 .707.707l7.433-7.431 7.579 7.282a.501.501 0 0 0 .846-.37.5.5 0 0 0-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 1 0-.707-.708L8.991 7.853 1.413.573a.5.5 0 1 0-.693.72l7.563 7.268z"
    />
  </svg>
);

export default LightCloseIcon;
