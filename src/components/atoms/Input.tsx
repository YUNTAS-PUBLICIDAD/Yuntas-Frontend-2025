import React from "react";

const sizeMap = {
  xxxl:"w-[1091px] h-[181px]",
  xxl: "w-[1091px] h-[40px]",
  xl:  "w-[579px] h-[40px]",
  
};

type InputProps = {
  size?: "xxxl"|"xxl" | "xl" | number;
  placeHolder?: string;
  type?: "text";
  bgColor?:string,
};

const Input = ({ size = "xxl", placeHolder, type = "text" ,bgColor="bg-white"}: InputProps) => {
  const sizeClass =typeof size === "string"? sizeMap[size] || "": `h-[${size}px] w-[${size}px]`;

  return (
    <input
      type={type}
      placeholder={placeHolder}
      className={`border border-[#222222] rounded-[15px] px-3 ${sizeClass} ${bgColor}`}
    />
  );
};
export default Input