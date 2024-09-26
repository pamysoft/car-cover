import React from 'react';

type Option = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  name,
  label,
  value,
  options,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
}) => {
  return (
    <div className="relative">
      <div className="focus-within:0 0 1px relative min-h-[50px] rounded-[5px] border border-[#DEDEDE] bg-white stroke-primary px-3 py-1 focus-within:border-[2px] focus-within:border-primary">
        {/* The label will be positioned above the select if there's a value */}
        <label
          htmlFor={id}
          className={`absolute left-3 px-0 bg-white text-xs transition-all duration-200 ease-in-out 
            ${value ? '-translate-y-0 text-[#707070]' : 'invisible'}`}
        >
          {label}
        </label>

        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`text-[14px] w-full border-none bg-white px-0 py-1 focus:outline-none ${
            value ? 'mt-[12px]' : 'mt-[5px]'
          }`}
        >
          {/* Optionally add a placeholder option */}
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {/* Map through the options */}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectField;
