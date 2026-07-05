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
  type = "button",
  ...props
}) => {

 const hasCustomBg = style?.backgroundColor;
 const hasCustomText = style?.color;

  return (
    <button
      type={type}
      {...props}
      style={style}
      className={`${!hasCustomBg ? "bg-[#1D2C5e] hover:bg-[#141B40]" : ""} ${!hasCustomText ? "text-white" : ""} font-semibold
      py-3 px-16 rounded-full transition-colors duration-300
      uppercase text-lg
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23C1DE] focus-visible:ring-offset-2
      ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;