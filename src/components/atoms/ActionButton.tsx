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
    return (
        <Button size="sm" variant={variant} className={`py-1 ${bgColor ? bgColor : ""}`} onClick={onClick}>
            <p className="font-semibold text-xl">{children}</p>
        </Button>
    );
}