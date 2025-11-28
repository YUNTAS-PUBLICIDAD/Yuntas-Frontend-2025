import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
}) => {
  const baseClasses = "font-bold rounded-2xl md:rounded-3xl transition-all duration-300 hover:scale-105 inline-block text-center";
  
  const variantClasses = {
    primary: "bg-[#23C1DE] text-white hover:bg-[#5BC5C7]",
    secondary: "bg-white text-[#0B0B1F] hover:bg-gray-100",
    tertiary: "bg-[#203565] text-white hover:bg-[#162E4D]",
    outline: "border-2 border-white text-white hover:bg-white hover:text-[#0B0B1F]",
  };
  
  const sizeClasses = {
    sm: "px-6 py-2 text-sm",
    md: "px-9 py-3 text-base",
    lg: "px-12 py-4 text-lg",
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;
