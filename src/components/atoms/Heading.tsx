import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  color?: string;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  level = "h2",
  size = "xl",
  color = "text-white",
  className = "",
}) => {
  const Tag = level;
  
  const sizeClasses = {
    sm: "text-xl md:text-2xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl",
    xl: "text-4xl md:text-5xl",
    "2xl": "text-5xl md:text-6xl",
    "3xl": "text-6xl md:text-7xl",
  };
  
  const classes = `font-bold ${sizeClasses[size]} ${color} ${className}`;
  
  return <Tag className={classes}>{children}</Tag>;
};

export default Heading;
