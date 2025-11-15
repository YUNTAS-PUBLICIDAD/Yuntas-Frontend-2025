import React from "react";

type LabelProps = {
  children: React.ReactNode;
  color?: string;
  className?: string;
};

const Label = ({children,color = "text-black",className = ""}:LabelProps) => {
  return (
    <label className={`${color} ${className}`}>
      {children}
    </label>
  );
};

export default Label;
