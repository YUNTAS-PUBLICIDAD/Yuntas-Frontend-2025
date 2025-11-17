import React from "react";

const sizeMap = {
  xxxl: "max-w-[1091px] h-[181px] w-full",
  xxl:  "max-w-[1091px] h-[40px]  w-full",
  xl:   "max-w-[579px]  h-[40px]  w-full",
  sl:   "max-w-[200px]  h-[40px]  w-full",
};

type TextProps = {
  size?: keyof typeof sizeMap | string;
  placeHolder?: string;
  bgColor?:string,
};
type LabelProps = {
  textLabel:string,
  colorLabel?: string;
};

type Props=LabelProps & TextProps
const TextTarea = ({ size = "xxl", placeHolder, bgColor="bg-white",textLabel,colorLabel="color-black"}: Props) => {
  const sizeClass =typeof size === "string"? sizeMap[size as keyof typeof sizeMap] ?? size: "";  
  return (
    <div className="flex flex-col">
      <label className={`${colorLabel}`}>{textLabel}</label>
      <textarea
        placeholder={placeHolder}
        className={`border border-[#222222] rounded-[15px] p-3 resize-none align-top ${sizeClass} ${bgColor}`}
      />
    </div>
  );
};
export default TextTarea