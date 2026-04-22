import React from "react";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode,
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  className = "",
  style,
  ...props
}) => {

 const hasCustomBg = style?.backgroundColor;
 const hasCustomText = style?.color;

  return (
    <button
      {...props}
      style={style}
      className={`${!hasCustomBg ? "bg-[#1D2C5e] hover:bg-[#141B40]" : ""} ${!hasCustomText ? "text-white" : ""} font-semibold
      py-3 px-16 rounded-full transition-colors duration-300
      uppercase text-lg ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
