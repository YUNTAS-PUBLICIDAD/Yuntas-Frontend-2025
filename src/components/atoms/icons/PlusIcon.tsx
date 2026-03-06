interface PlusIconProps {
    size?: number;
    className?: string;
}

export default function PlusIcon({ size = 18, className }: PlusIconProps) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 5v14"></path>
            <path d="M5 12h14"></path>
        </svg>
    );
}
