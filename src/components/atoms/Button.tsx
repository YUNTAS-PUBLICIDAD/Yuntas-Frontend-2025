import React from "react";
import Link from "next/link";
import { ReactNode } from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "success" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  disabled = false,
  icon,
  type = "button",
  ...props
}) => {
  const baseClasses = "font-bold rounded-3xl transition-all duration-300 inline-block text-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23C1DE] focus-visible:ring-offset-2";

  const variantClasses = {
    primary: "bg-[#23C1DE] text-white hover:bg-[#5BC5C7]",
    secondary: "bg-white text-[#0B0B1F] hover:bg-gray-100",
    tertiary: "bg-[#203565] text-white hover:bg-[#162E4D]",
    outline: "border-2 border-white text-white hover:bg-white hover:text-[#0B0B1F]",
    success: "bg-[#008236] text-white hover:bg-[#006622]",
    danger: "bg-[#DC3545] text-white hover:bg-[#C82333]",
    info: "bg-[#23C1DE] text-white hover:bg-[#1fb2cc]"
  };

  const sizeClasses = {
    sm: "px-6 py-2 text-sm",
    md: "px-9 py-3 text-base",
    lg: "px-12 py-4 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? "" : "hover:scale-105"} ${className}`;

  const content = (
    <span className={icon ? "inline-flex items-center justify-center gap-2" : "inline-flex items-center justify-center"}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...props}>
      {content}
    </button>
  );
};

export default Button;