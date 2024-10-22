import React, { ChangeEventHandler } from 'react';

type TextareaFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
};

const TextareaField: React.FC<TextareaFieldProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  rows = 4, // Default rows for textarea
}) => {
  return (
    <div className="relative">
      <div className="focus-within:0 0 1px relative min-h-[50px] rounded-[5px] border border-[#DEDEDE] bg-white stroke-primary px-3 py-1 focus-within:border-[2px] focus-within:border-primary">
        {/* Label positioned above the textarea if there's a value */}
        <label
          htmlFor={id}
          className={`absolute left-3 px-0 bg-white text-xs transition-all duration-200 ease-in-out 
            ${value ? '-translate-y-0 text-[#707070]' : 'invisible'}`}
        >
          {label}
        </label>

        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder ? placeholder : label}
          required={required}
          disabled={disabled}
          rows={rows}
          className={` placeholder:text-[#707070] disabled:text-[#707070] text-[14px] w-full border-none bg-white px-0 py-1 focus:outline-none ${value ? 'mt-[12px]' : 'mt-[5px]'}`}
        />
      </div>
    </div>
  );
};

export default TextareaField;