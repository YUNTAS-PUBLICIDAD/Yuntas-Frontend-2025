interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'delete' | 'approve' | 'edit';
    tooltip?: string;
}

const IconButton = ({ 
    children, 
    variant = 'edit', 
    tooltip,
    className = "",
    disabled,
    ...props 
}: IconButtonProps) => {
    
    // Configuración de colores extraída de tu código original
    const variants = {
        delete: "text-[#203565] hover:text-[#0D1030] disabled:text-[#203565]/30",
        approve: "text-[#23C1DE] hover:text-[#1a9bb8] disabled:text-[#23C1DE]/30",
        edit:    "text-[#23C1DE] hover:text-[#1a9bb8] disabled:text-[#23C1DE]/30"
    };

    return (
        <button
            type="button"
            className={`
                p-2 rounded-full transition-colors duration-200 
                flex items-center justify-center 
                active:scale-95
                ${variants[variant]} 
                ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} 
                ${className}
            `}
            title={tooltip}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default IconButton;