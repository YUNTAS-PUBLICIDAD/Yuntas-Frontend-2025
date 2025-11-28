import React from "react";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`bg-[#1D2C5E] hover:bg-[#141B40] text-white font-semibold 
      py-3 px-16 rounded-full transition-colors duration-300 
      uppercase text-lg ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
