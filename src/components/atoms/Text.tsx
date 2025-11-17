import React from "react";

interface TextProps {
  children: React.ReactNode;
  variant?: "banner"|"body" | "subtitle" | "caption" | "small";
  color?: "gray" | "white" | string;
  className?: string;
}

const Text: React.FC<TextProps> = ({
  children,
  variant = "body",
  color = "gray",
  className = "",
}) => {
  const variantClasses = {
    banner: "text-xl md:text-3xl",
    body: "text-base md:text-lg",
    subtitle: "text-lg md:text-xl",
    caption: "text-xl md:text-2xl",
    small: "text-sm md:text-base",
  };
  
  const colorClass =
    color === "gray"
      ? "text-gray-700"
      : color === "white"
      ? "text-white"
      : color;
  const classes = `${colorClass} ${className} ${variantClasses[variant]}`;
  
  return <p className={classes}>{children}</p>;
};

export default Text;
