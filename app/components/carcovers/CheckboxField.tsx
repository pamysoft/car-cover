import React from 'react';

type CheckboxFieldProps = {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  className?: string;
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  id,
  name,
  label,
  checked,
  onChange,
  required = false,
  disabled = false,
  errorMessage = '',
  className = '',
}) => {
  return (
    <div className={`checkbox-field ${className}`}>
      <label htmlFor={id} className="flex items-center space-x-2">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out ${errorMessage ? 'border-red-500' : ''}`}
        />
        <span className="text-gray-700">{label}</span>
      </label>
      {errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default CheckboxField;
