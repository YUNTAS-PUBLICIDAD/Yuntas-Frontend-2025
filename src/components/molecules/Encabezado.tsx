import Text from "@/components/atoms/Text";
import { ReactNode } from "react";

type EncabezadoVariant = "celeste" | "blanco" | "azul";

interface EncabezadoProps {
  children: ReactNode;
  variant?: EncabezadoVariant;
  className?: string;
}

const variantStyles: Record<EncabezadoVariant, { bg: string; text: string }> = {
  celeste: {
    bg: "bg-[#23C1DE]",
    text: "text-white",
  },
  blanco: {
    bg: "bg-white",
    text: "text-[#203565]",
  },
  azul: {
    bg: "bg-[#203565]",
    text: "text-white",
  },
};

export default function Encabezado({
  children,
  variant = "celeste",
  className = "",
}: EncabezadoProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`
        relative
        w-full
        ${styles.bg}
        ${styles.text}

        /* Altura estable */
        min-h-[64px]

        /* Padding fluido (no rompe en tablet) */
        px-4 sm:px-6 lg:px-12
        py-4

        /* Alineación */
        flex items-center justify-center

        ${className}
      `}
    >
      {typeof children === "string" ? (
        <Text
          variant="caption"
          className="
            font-bold
            text-base sm:text-lg lg:text-xl
            leading-tight
            text-center
            max-w-full
            break-words
          "
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </div>
  );
}
