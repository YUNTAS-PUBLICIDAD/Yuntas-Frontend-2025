import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
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
  const baseClasses = "font-bold rounded-lg transition-all duration-300 hover:scale-105 inline-block text-center";
  
  const variantClasses = {
    primary: "bg-[#6DE1E3] text-[#0B0B1F] hover:bg-[#5BC5C7]",
    secondary: "bg-white text-[#0B0B1F] hover:bg-gray-100",
    outline: "border-2 border-white text-white hover:bg-white hover:text-[#0B0B1F]",
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
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
