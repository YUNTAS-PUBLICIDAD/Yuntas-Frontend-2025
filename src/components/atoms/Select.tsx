import React from 'react';

type SelectOption = {
  value: string | number; // Fixed: removed arrays
  label: string;
};

type SelectProps = {
  options: string[] | SelectOption[];
  name?: string;
  textLabel?: string;
  colorLabel?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  multiple?: boolean;
  className?: string;
  
};

const Select = ({
  name,
  options,
  textLabel,
  colorLabel = "text-black",
  value = "",
  onChange,
  required = false,
  multiple = false,
  className = "bg-[#CFD2D2] rounded-xl w-full px-4 py-2",
  
}: SelectProps) => {
  const normalizedOptions: SelectOption[] = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    } else if (typeof opt === 'object') { // especialmente para productos
      return {value: opt.id, label: opt.name};
    }
    return opt;
  });

  return (
    <div className="flex flex-col gap-2">
      {textLabel && (
        <label className={`${colorLabel} text-sm font-medium`}>
          {textLabel}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        name={name}
        className={`${className} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        value={value}
        onChange={onChange}
        required={required}
        multiple={multiple}
        
      >
        {!multiple && (
          <option value="" disabled>
            --- Selecciona una opción ---
          </option>
        )}
        {normalizedOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;