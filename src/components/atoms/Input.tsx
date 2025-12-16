import React from "react";

const sizeMap = {
  xxxl: "max-w-[1091px] h-[181px] w-full",
  xxl:  "max-w-[1091px] h-[40px]  w-full",
  xl:   "max-w-[579px]  h-[40px]  w-full",
  sl:   "max-w-[200px]  h-[40px]  w-full",
} as const;


type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: "xxxl" | "xxl" | "xl" | "sl";
  placeholder: string;
  type?: string;
  bgColor?: string;
  textLabel: string;
  colorLabel?: string;
  rounded?: string;
};

const Input = ({
  size = "xl",
  placeholder,
  type = "text",
  bgColor = "bg-white",
  textLabel,
  colorLabel = "text-black",
  rounded = "rounded-[15px]",
  ...props
}: InputProps) => {

  const sizeClass = sizeMap[size];

  return (
    <div className="flex flex-col  gap-2">
      <label className={colorLabel}>{textLabel}</label>
      <input
        {...props}
        type={type}
        placeholder={placeholder}
        className={`border border-[#222222] ${rounded} px-3 ${sizeClass} ${bgColor}`}
      />
    </div>
  );
};

export default Input;
