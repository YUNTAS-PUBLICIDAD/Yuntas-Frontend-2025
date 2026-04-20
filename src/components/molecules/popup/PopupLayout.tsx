import React from "react";

export const PopupLayout = ({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      {children}
    </div>
  );
};
