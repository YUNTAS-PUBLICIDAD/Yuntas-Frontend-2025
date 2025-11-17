import React from "react";

const sizeMap = {
  xxxl: "max-w-[1091px] h-[181px] w-full",
  xxl:  "max-w-[1091px] h-[40px]  w-full",
  xl:   "max-w-[579px]  h-[40px]  w-full",
  sl:   "max-w-[200px]  h-[40px]  w-full",
};

type InputProps = {
  size?: keyof typeof sizeMap | string;
  placeholder: string;
  type?: "text"|"email"|"time"|string;
  bgColor?:string,
};

type LabelProps = {
  textLabel:string,
  colorLabel?: string;
};
type Props=InputProps&LabelProps
const Input = ({ size = "xxl", placeholder, type = "text" ,bgColor="bg-white",textLabel,colorLabel="text-black"}: Props) => {
    const sizeClass =typeof size === "string"? sizeMap[size as keyof typeof sizeMap] ?? size: "";  
    return (
    <div className="flex flex-col gap-2">
      <label className={`${colorLabel}`}>{textLabel}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`border border-[#222222] rounded-[15px] px-3 ${sizeClass} ${bgColor}`}
      />
    </div>
  );
};
export default Input