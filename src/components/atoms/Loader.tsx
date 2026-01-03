interface LoaderProps {
    size?: "sm" | "md" | "lg";
    color?: string;
    className?: string;
}

export default function Loader({ 
    size = "md", 
    color = "border-[#23C1DE]",
    className = ""
}: LoaderProps) {
    const sizeClasses = {
        sm: "w-6 h-6 border-2",
        md: "w-10 h-10 border-3",
        lg: "w-16 h-16 border-4"
    };

    return (
        <div 
            className={`${sizeClasses[size]} ${color} border-t-transparent rounded-full animate-spin ${className}`}
        />
    );
}