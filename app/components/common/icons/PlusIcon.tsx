import React from 'react';

interface PlusIconProps {
  width?: string;
  height?: string;
  color?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({
  width = "10",
  height = "10",
  color = "currentColor",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-plus"
    viewBox="0 0 10 10"
    width={width}
    height={height}
    fill="none"
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M1 4.51a.5.5 0 0 0 0 1h3.5l.01 3.5a.5.5 0 0 0 1-.01V5.5l3.5-.01a.5.5 0 0 0-.01-1H5.5L5.49.99a.5.5 0 0 0-1 .01v3.5l-3.5.01z"
      clipRule="evenodd"
    />
  </svg>
);

export default PlusIcon;
