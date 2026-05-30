interface InputProps {
    label: string;
    name: string;
    type?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    min?: number;
}

export default function Input({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    min = 0 
}: InputProps) {
    return (
        <div className="flex flex-col gap-1">
            <label 
                htmlFor={name} 
                className="text-[#203565] font-medium dark:text-[#ECECEC]/80"
            >
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                min={min}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23C1DE] focus:border-transparent transition-all text-[#203565] dark:text-[#ECECEC]/80 dark:border dark:border-[#ECECEC]/20 dark:bg-[#1C2347]"
            />
        </div>
    );
}