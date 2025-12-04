interface TextareaAdminProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    helperText?: string;
    required?: boolean;
    maxLength?: number;
    rows?: number;
    disabled?: boolean;
}

export default function TextareaAdmin({
    label,
    name,
    value,
    onChange,
    placeholder,
    helperText,
    required = false,
    maxLength,
    rows = 4,
    disabled = false
}: TextareaAdminProps) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-[#203565] font-medium">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                maxLength={maxLength}
                rows={rows}
                disabled={disabled}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23C1DE] focus:border-transparent transition-all resize-none disabled:opacity-50"
            />
            {helperText && (
                <span className="text-gray-500 text-sm">{helperText}</span>
            )}
        </div>
    );
}