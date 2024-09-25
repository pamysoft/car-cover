import React from 'react';

interface EditIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const EditIcon: React.FC<EditIconProps> = ({ width = 14, height = 14, className = '' }) => {
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
        d="M9.097 3.226l1.394-1.394a.47.47 0 0 1 .665 0l1.107 1.107a.47.47 0 0 1 0 .665l-1.394 1.394M9.097 3.226l1.772 1.772M9.097 3.226L4.04 8.284m6.83-3.286l-5.06 5.058M4.039 8.284l-.768.768a.5.5 0 0 0-.103.155l-1.182 2.902 2.902-1.182a.5.5 0 0 0 .155-.103l.768-.768M4.039 8.284l1.772 1.772"
      />
    </svg>
  );
};

export default EditIcon;
