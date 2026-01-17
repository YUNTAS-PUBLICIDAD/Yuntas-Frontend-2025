import ActionButton from "@/components/atoms/ActionButton";

interface ButtonConfig {
    label: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "tertiary" | "outline" | "success" | "danger";
    className?: string; // Permitir override por botón
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
                return "!bg-[#23C1DE] text-white hover:opacity-90 dark:!bg-[#293296]";
            default:
                return "!bg-[#23C1DE] text-white hover:opacity-90 dark:!bg-[#293296]";
        }
    };


    return (
        <div className={`flex flex-wrap ${positionClasses[position]} gap-2 md:gap-4 ${className}`}>
            {buttons.map((button, index) => (
                <ActionButton
                    key={index}
                    onClick={button.onClick}
                    variant={button.variant}
                    bgColor={button.bgColor ?? getBgColorByVariant(button.variant)}
                    className={button.className} // Pasamos la clase personalizada
                >
                    {button.label}
                </ActionButton>
            ))}
        </div>
    );
}
