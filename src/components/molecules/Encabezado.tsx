import Text from "@/components/atoms/Text"
import { ReactNode } from "react"

type EncabezadoVariant = "celeste" | "blanco" | "azul";

interface EncabezadoProps {
    children: ReactNode;
    variant?: EncabezadoVariant;
    className?: string;
}

const variantStyles: Record<EncabezadoVariant, { bg: string; text: string }> = {
    celeste: {
        bg: "bg-[#23C1DE]",
        text: "text-white"
    },
    blanco: {
        bg: "bg-white",
        text: "text-[#203565]"
    },
    azul: {
        bg: "bg-[#203565]",
        text: "text-white"
    }
};

export default function Encabezado({ children, variant = "celeste", className = "" }: EncabezadoProps) {
    const styles = variantStyles[variant];

    return (
        <div className={`w-full ${styles.bg} py-6 px-6 md:px-16 text-center ${className}`}>
            {typeof children === "string" ? (
                <Text
                    variant="caption"
                    className={`${styles.text} font-bold text-xl md:text-3xl`}
                >
                    {children}
                </Text>
            ) : (
                <div className={styles.text}>
                    {children}
                </div>
            )}
        </div>
    )
}