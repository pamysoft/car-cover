import React from 'react';

interface RemoveIconProps {
  width?: string;
  height?: string;
  color?: string;
}

const RemoveIcon: React.FC<RemoveIconProps> = ({
  width = "16",
  height = "16",
  color = "currentColor",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-remove"
    viewBox="0 0 16 16"
    width={width}
    height={height}
    fill="none"
  >
    <path
      fill={color}
      d="M14 3h-3.53a3.07 3.07 0 0 0-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 0 0 5.53 3H2a.5.5 0 0 0 0 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 0 0 .5-.5V4H14a.5.5 0 0 0 0-1M6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02m4.84 11.52h-7.5V4h7.5z"
    />
    <path
      fill={color}
      d="M6.55 5.25a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 1 0v-6a.5.5 0 0 0-.5-.5m2.9 0a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 1 0v-6a.5.5 0 0 0-.5-.5"
    />
  </svg>
);

export default RemoveIcon;