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
  onDelete,
  onSave,
  showDeleteButton = false, // Default to false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[838px] max-w-full rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="mt-4">{children}</div>
        <div className="mt-4 flex justify-end space-x-4">
          {showDeleteButton && onDelete && (
            <button
              onClick={onDelete}
              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Delete
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="rounded bg-accent px-4 py-2 text-white hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;