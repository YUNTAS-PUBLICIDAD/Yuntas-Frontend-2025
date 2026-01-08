interface InputAdminProps {
    label: string;
    name: string;
    type?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    helperText?: string;
    required?: boolean;
    maxLength?: number;
    disabled?: boolean;
}

export default function InputAdmin({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    helperText,
    required = false,
    maxLength,
    disabled = false
}: InputAdminProps) {
    return (
        <div className="flex flex-col gap-1 flex-1">
            <label htmlFor={name} className="text-[#203565] font-medium">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                maxLength={maxLength}
                disabled={disabled}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23C1DE] focus:border-transparent transition-all disabled:opacity-50"
            />
            {helperText && (
                <span className="text-gray-500 text-sm">{helperText}</span>
            )}
        </div>
    );
}