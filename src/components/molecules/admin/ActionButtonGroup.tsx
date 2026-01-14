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

    const getBgColorByVariant = (variant?: ButtonConfig["variant"]) => {
    switch (variant) {
        case "secondary":
            return "!bg-[#23C1DE] text-white hover:opacity-90 dark:!bg-[#293296]";
        case "primary":
            return "!bg-[#00031E] text-white hover:opacity-90 dark:!bg-[#293296]";
        default:
            return "!bg-[#00031E] text-white hover:opacity-90 dark:!bg-[#293296]";
    }
};


    return (
        <div className={`flex ${positionClasses[position]} gap-4 ${className}`}>
            {buttons.map((button, index) => (
                <ActionButton
                    key={index}
                    onClick={button.onClick}
                    variant={button.variant}
                    bgColor={button.bgColor ?? getBgColorByVariant(button.variant)}
                >
                    {button.label}
                </ActionButton>
            ))}
        </div>
    );
}
