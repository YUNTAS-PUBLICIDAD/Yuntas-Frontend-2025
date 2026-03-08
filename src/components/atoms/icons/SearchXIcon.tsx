interface SearchXIconProps {
    size?: number;
    className?: string;
}

export default function SearchXIcon({ size = 48, className = "text-gray-400 mb-2" }: SearchXIconProps) {
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
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
            <path d="m13.5 8.5-5 5"></path>
            <path d="m8.5 8.5 5 5"></path>
        </svg>
    );
}
