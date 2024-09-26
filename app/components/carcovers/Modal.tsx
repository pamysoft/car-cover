import React, { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onDelete?: () => void; // Optional onDelete prop
  onSave: (event: React.FormEvent) => void; // Required onSave prop
  showDeleteButton?: boolean; // New prop to control the visibility of the delete button
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,  
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[838px] max-w-full rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="mt-4">{children}</div>
        
      </div>
    </div>
  );
};

export default Modal;