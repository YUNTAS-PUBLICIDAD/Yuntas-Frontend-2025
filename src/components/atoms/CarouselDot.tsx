import React from "react";

interface CarouselDotProps {
  active: boolean;
  onClick: () => void;
}

const CarouselDot: React.FC<CarouselDotProps> = ({ active, onClick }) => (
  <button
    className={`w-4 h-4 rounded-full mx-2 border-2 border-white bg-white transition-all duration-200 ${active ? "bg-cyan-400 border-cyan-400" : "opacity-60"}`}
    onClick={onClick}
    aria-label="Ir al slide"
  />
);

export default CarouselDot;
