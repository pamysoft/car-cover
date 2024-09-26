import React from 'react';

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'password' | 'email';
  required?: boolean;
  disabled?: boolean;
};

const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  required = false,
  disabled = false,
}) => {
  return (
    <div className="relative">
      <div className="focus-within:0 0 1px relative min-h-[50px] rounded-[5px] border border-[#DEDEDE] bg-white stroke-primary px-3 py-1 focus-within:border-[2px] focus-within:border-primary">
        {/* The label will be positioned above the input if there's a value */}
        <label
          htmlFor={id}
          className={`absolute left-3 px-0 bg-white text-xs transition-all duration-200 ease-in-out 
            ${value ? '-translate-y-0 text-[#707070]' : 'invisible'}`}
        >
          {label}
        </label>

        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={` placeholder:text-[#707070] disabled:text-[#707070] text-[14px] w-full border-none bg-white px-0 py-1 focus:outline-none ${value ? 'mt-[12px]' : 'mt-[5px]'}`}
        />
      </div>
    </div>
  );
};

export default TextField;
