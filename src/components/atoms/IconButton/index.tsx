interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'delete' | 'approve' | 'edit';
    tooltip?: string;
    label?: string; // opcional: no rompe usos existentes de IconButton
}

const IconButton = ({ 
    children, 
    variant = 'edit', 
    tooltip,
    label,
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

    // Nombre accesible: usa label si lo pasan, si no cae a tooltip, si no al variant
    const accessibleName = label ?? tooltip ?? variant;

    return (
        <button
            type="button"
            aria-label={accessibleName}
            title={tooltip ?? accessibleName}
            className={`
                p-2 rounded-full transition-colors duration-200 
                flex items-center justify-center 
                active:scale-95
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23C1DE] focus-visible:ring-offset-2
                ${variants[variant]} 
                ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} 
                ${className}
            `}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default IconButton;