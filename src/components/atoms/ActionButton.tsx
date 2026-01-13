import Button from "@/components/atoms/Button";

interface ActionButtonProps {
    children: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "tertiary" | "outline" | "success" | "danger";
    bgColor?: string;
}

export default function ActionButton({ 
    children, 
    onClick, 
    variant = "primary",
    bgColor
}: ActionButtonProps) {

    // 👉 Si viene bgColor, debe tener prioridad TOTAL
    const finalClasses = bgColor ?? "";

    return (
        <Button
            size="sm"
            variant={variant}
            onClick={onClick}
            className={`py-1 ${finalClasses}`}
        >
            <p className="font-semibold text-xl">
                {children}
            </p>
        </Button>
    );
}
