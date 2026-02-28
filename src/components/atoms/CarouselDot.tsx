import React from "react";

interface CarouselDotProps {
  active: boolean;
  onClick: () => void;
}

const CarouselDot: React.FC<CarouselDotProps> = ({ active, onClick }) => (
  <button
    className={`h-3 rounded-full transition-all duration-300 shadow-md ${active
        ? "w-10 bg-[#20838f] shadow-[#20838f]/30"
        : "w-3 bg-gray-400 hover:bg-[#60c4c4] opacity-50"
      }`}
    onClick={onClick}
    aria-label="Ir al slide"
  />
);

export default CarouselDot;
