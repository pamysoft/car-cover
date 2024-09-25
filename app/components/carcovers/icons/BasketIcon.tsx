import React from 'react';

interface BasketIconProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const BasketIcon: React.FC<BasketIconProps> = ({ width = 14, height = 14, className }) => {
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
      <circle cx="3.5" cy="11.9" r="0.3" />
      <circle cx="10.5" cy="11.9" r="0.3" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.502 11.898h-.004v.005h.004zm7 0h-.005v.005h.005zM1.4 2.1h.865a.7.7 0 0 1 .676.516l1.818 6.668a.7.7 0 0 0 .676.516h5.218a.7.7 0 0 0 .68-.53l1.05-4.2a.7.7 0 0 0-.68-.87H3.4"
      />
    </svg>
  );
};

export default BasketIcon;
