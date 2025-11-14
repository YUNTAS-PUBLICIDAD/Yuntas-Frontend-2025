import React from "react";

interface DividerLineProps {
  color?: string;
  height?: string;
  className?: string;
}

const DividerLine: React.FC<DividerLineProps> = ({
  color = "#6DE1E3",
  height = "12px",
  className = "",
}) => (
  <div
    className={`w-full absolute left-0 bottom-0 ${className}`}
    style={{ backgroundColor: color, height }}
  />
);

export default DividerLine;
