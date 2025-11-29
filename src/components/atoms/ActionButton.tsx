import Button from "@/components/atoms/Button";

interface ActionButtonProps {
    children: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "tertiary" | "outline";
}

export default function ActionButton({ 
    children, 
    onClick, 
    variant = "primary" 
}: ActionButtonProps) {
    return (
        <Button size="sm" variant={variant} className="py-1" onClick={onClick}>
            <p className="font-semibold text-xl">{children}</p>
        </Button>
    );
}