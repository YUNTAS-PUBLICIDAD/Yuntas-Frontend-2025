import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ className = "", ...props }) => {
  return (
    <textarea
      {...props}
      className={`w-full px-4 py-3 border border-white-400 rounded-md 
      focus:outline-none focus:border-blue-500 
      text-gray-800 placeholder-gray-500 bg-white ${className}`}
    />
  );
};

export default TextArea;
