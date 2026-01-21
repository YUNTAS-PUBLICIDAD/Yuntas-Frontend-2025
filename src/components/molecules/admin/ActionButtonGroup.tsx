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
        const baseColor = "!bg-[#203565] hover:!bg-[#162E4D] focus:!bg-[#203565] text-white active:!bg-[#203565]";
        const darkColor = "dark:!bg-[#293296] dark:hover:!bg-[#1e2570] dark:focus:!bg-[#293296]";

        return `${baseColor} ${darkColor}`;
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
