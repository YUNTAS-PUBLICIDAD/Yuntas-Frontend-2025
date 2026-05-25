type SelectOption = {
    value: string | number;
    label: string;
};

interface SelectFormProps {
    label: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
    options: string[] | Record<string, any>[];
    error?: string;
}

export default function SelectForm({
    label,
    name,
    value,
    onChange,
    required = false,
    options,
    error
}: SelectFormProps) {

    const normalizedOptions: SelectOption[] = options.map((opt) => {
        if (typeof opt === 'string') {
            return { value: opt, label: opt };
        } else if (typeof opt === 'object') {
            return { value: opt.id, label: opt.name };
        }
        return opt;
    });

    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={name}
                className="text-[#203565] font-medium dark:text-[#ECECEC]/80"
            >
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23C1DE] focus:border-transparent transition-all overflow-y-auto max-h-50 text-[#203565] dark:bg-[#1C2347] dark:text-[#ECECEC]/80 dark:border-[#ECECEC]/20 ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-[#23CIDE] focus:border-transparent"}`}
                size={1}
            >
                <option value="">
                    --- Selecciona una opción ---
                </option>
                {normalizedOptions.map((option, index) => (
                    <option key={option?.value ?? index} value={option?.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {
              error && (
                <span className="text-red-500 text-sm">
                  {error}
                </span>
              )
            }

        </div>
    );
}