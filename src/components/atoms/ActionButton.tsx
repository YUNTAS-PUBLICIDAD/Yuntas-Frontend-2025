import Button from "@/components/atoms/Button";

interface ActionButtonProps {
    children: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "tertiary" | "outline" | "success" | "danger";
    className?: string;
    bgColor?: string;
}

export default function ActionButton({
    children,
    onClick,
    variant = "primary",
    bgColor,
    className
}: ActionButtonProps) {

    // 👉 Si viene bgColor, debe tener prioridad TOTAL
    const finalClasses = bgColor ?? "";

    return (
        <Button
            size="sm"
            variant={variant}
            onClick={onClick}
            className={`py-1 !px-3 sm:!px-4 ${className ?? "w-full sm:w-auto"} ${finalClasses}`}
        >
            <p className="font-semibold text-xs sm:text-sm md:text-base">
                {children}
            </p>
        </Button>
    );
}
