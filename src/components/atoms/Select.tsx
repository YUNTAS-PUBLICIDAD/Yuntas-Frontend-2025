import React from 'react';

// Definimos la estructura básica de una opción
type SelectOption = {
  value: string | number;
  label: string;
};

// Props del componente
type SelectProps = {
  options: (string | SelectOption | any)[]; // 'any' añadido para permitir objetos flexibles como productos
  name?: string;
  textLabel?: string;
  colorLabel?: string;
  value?: string | number;
  required?: boolean;
  multiple?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; // ¡Agregado!
};

const Select = ({
  name,
  options,
  textLabel,
  colorLabel = "text-black",
  value = "",
  required = false,
  multiple = false,
  className = "bg-[#CFD2D2] rounded-xl w-full px-4 py-2",
  onChange, // ¡Agregado aquí también!
}: SelectProps) => {

  // Normalizamos las opciones para asegurarnos de que siempre tengan value y label
  const normalizedOptions: SelectOption[] = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    } else if (typeof opt === 'object' && opt !== null) {
      // Lógica para manejar tanto {value, label} como {id, name} (productos)
      const val = opt.value !== undefined ? opt.value : opt.id;
      const lab = opt.label !== undefined ? opt.label : opt.name;
      
      return { value: val, label: lab };
    }
    // Fallback por seguridad
    return { value: String(opt), label: String(opt) };
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
          <option key={`${option.value}-${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;