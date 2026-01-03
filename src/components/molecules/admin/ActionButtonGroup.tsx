import ActionButton from "@/components/atoms/ActionButton";

interface ButtonConfig {
    label: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "tertiary" | "outline" | "success" | "danger";
    bgColor?: string;
}

interface ActionButtonGroupProps {
    buttons: ButtonConfig[];
    position?: "start" | "center" | "end";
    className?: string;
}

export default function ActionButtonGroup({ 
    buttons, 
    position = "start",
    className = ""
}: ActionButtonGroupProps) {
    const positionClasses = {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end"
    };

    return (
        <div className={`flex ${positionClasses[position]} gap-4 ${className}`}>
            {buttons.map((button, index) => (
                <ActionButton
                    key={index}
                    onClick={button.onClick}
                    variant={button.variant}
                    bgColor={button.bgColor}
                >
                    {button.label}
                </ActionButton>
            ))}
        </div>
    );
}