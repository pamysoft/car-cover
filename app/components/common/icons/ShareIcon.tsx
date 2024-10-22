import React from 'react';

type ShareIconProps = {
  width?: number;
  height?: number;
  className?: string;
};

const ShareIcon: React.FC<ShareIconProps> = ({
  width = 24,
  height = 24,
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={`icon icon-share ${className}`}
      viewBox="0 0 13 12"
      width={width}
      height={height}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1.625 8.125v2.167a1.083 1.083 0 0 0 1.083 1.083h7.584a1.083 1.083 0 0 0 1.083-1.083V8.125"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M6.148 1.271a.5.5 0 0 1 .707 0L9.563 3.98a.5.5 0 0 1-.707.707L6.501 2.332 4.147 4.687a.5.5 0 1 1-.708-.707z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M6.5 1.125a.5.5 0 0 1 .5.5v6.5a.5.5 0 0 1-1 0v-6.5a.5.5 0 0 1 .5-.5"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default ShareIcon;
