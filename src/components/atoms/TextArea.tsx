import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  showCounter?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  className = " border-white-400 rounded-md  focus:outline-none focus:border-blue-500   text-gray-800 placeholder-gray-500 bg-white",
  showCounter = false,
  ...props
}) => {
  const value = typeof props.value === "string" ? props.value : "";
  const min = props.minLength;
  const max = props.maxLength;
  const count = value.length;

  const getCounterColor = () => {
    if (min !== undefined && count < min) return "text-red-500";
    if (max !== undefined && count >= max) return "text-red-500";
    return "text-gray-400";
  };

  return (
    <div className="relative w-full">
      <textarea
        {...props}
        className={`w-full px-4 py-3 border ${className}`}
      />
      {showCounter && (
        <span className={`absolute bottom-2 right-4 text-xs ${getCounterColor()}`}>
          {count}{max !== undefined ? ` / ${max}` : ""}
          {min !== undefined && count < min ? ` (mín. ${min})` : ""}
        </span>
      )}
    </div>
  );
};

export default TextArea;
