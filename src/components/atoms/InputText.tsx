import React from "react";

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const InputText: React.FC<InputTextProps> = ({ className = "", ...props }) => {
  return (
    <input
      {...props}
      className={`
        w-full px-4 py-3 border border-white-400 rounded-md
        focus:outline-none focus:border-blue-500
        text-gray-800 placeholder-gray-500 bg-white
        font-montserrat
        ${className}
      `}
    />
  );
};

export default InputText;
