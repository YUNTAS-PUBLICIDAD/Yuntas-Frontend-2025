import React from "react";

interface IconProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | number;
  bgColor?: string;
  className?: string;
  href?: string;
  label?: string;
}

const sizeMap = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
  "2xl": "h-24 w-24",
};

const Icon: React.FC<IconProps> = ({
  children,
  size = "md",
  bgColor = "bg-blue-900",
  className = "",
  href,
  label,
}) => {
  const sizeClass =
    typeof size === "string"
      ? sizeMap[size] || ""
      : `h-[${size}px] w-[${size}px]`;

  const content = (
    <div className={`${bgColor} rounded-full flex items-center justify-center p-2 ${sizeClass} ${className}`}>
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} aria-label={label}>
        {content}
      </a>
    );
  }

  return content;
};

export default Icon;
