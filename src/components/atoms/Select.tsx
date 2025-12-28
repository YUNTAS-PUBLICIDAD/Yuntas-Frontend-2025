import React from 'react';

type SelectOption = {
  value: string | number;
  label: string;
};

type SelectProps = {
  // Acepta tanto string[] como objetos con value/label
  options: string[] | SelectOption[];
  name?: string;
  textLabel?: string;
  colorLabel?: string;
  defaultValue?: string | number;
  required?: boolean;
  multiple?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({
  name,
  options,
  textLabel,
  colorLabel = "text-black",
  defaultValue = "",
  required = false,
  multiple = false,
  className = "bg-[#CFD2D2] rounded-xl w-full px-4 py-2",
  onChange
}: SelectProps) => {
  // Normalizar opciones al formato {value, label}
  const normalizedOptions: SelectOption[] = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return opt;
  });

  return (
    <div className="flex flex-col gap-2">
      {textLabel && (
        <label className={colorLabel}>
          {textLabel}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        name={name}
        className={`${className} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        defaultValue={defaultValue}
        required={required}
        multiple={multiple}
        onChange={onChange}
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