import React from "react";

interface TextProps {
  children: React.ReactNode;
  variant?: "body" | "subtitle" | "caption" | "small";
  color?: string;
  className?: string;
}

const Text: React.FC<TextProps> = ({
  children,
  variant = "body",
  color = "text-white",
  className = "",
}) => {
  const variantClasses = {
    body: "text-base md:text-lg",
    subtitle: "text-lg md:text-xl",
    caption: "text-xl md:text-2xl",
    small: "text-sm md:text-base",
  };
  
  const classes = `${variantClasses[variant]} ${color} ${className}`;
  
  return <p className={classes}>{children}</p>;
};

export default Text;
