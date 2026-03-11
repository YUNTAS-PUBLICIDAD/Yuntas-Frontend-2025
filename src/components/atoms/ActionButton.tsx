import Button from "@/components/atoms/Button";
import { ReactNode } from "react";

interface ActionButtonProps {
    children: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "tertiary" | "outline" | "success" | "danger";
    className?: string;
    bgColor?: string;
    isLoading?: boolean;
    icon?: ReactNode;
}

export default function ActionButton({
    children,
    onClick,
    variant = "primary",
    bgColor,
    className,
    isLoading = false,
    icon
}: ActionButtonProps) {

    const finalClasses = bgColor ?? "";

    return (
        <Button
            size="sm"
            variant={variant}
            onClick={onClick}
            className={`py-1 !px-3 sm:!px-4 !rounded-[10px] ${className ?? "w-full sm:w-auto"} ${finalClasses}`}
            disabled={isLoading}
        >
            <span className="flex items-center justify-center gap-2">
                {icon && <span className="flex-shrink-0">{icon}</span>}
                <p className="font-semibold text-xs sm:text-sm md:text-base">
                    {children}
                </p>
            </span>
        </Button>
    );
}
