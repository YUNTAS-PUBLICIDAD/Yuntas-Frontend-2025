import React from "react";

interface CarouselDotProps {
  active: boolean;
  onClick: () => void;
  index?: number; // opcional: no rompe usos existentes
  label?: string; // opcional: por si quieres personalizar el texto
}

const CarouselDot: React.FC<CarouselDotProps> = ({ active, onClick, index, label }) => {
  const accessibleName = label ?? (index !== undefined ? `Ir al slide ${index + 1}` : "Ir al slide");

  return (
    <button
      type="button"
      className={`h-3 rounded-full transition-all duration-300 shadow-md ${active
          ? "w-10 bg-[#20838f] shadow-[#20838f]/30"
          : "w-3 bg-gray-400 hover:bg-[#60c4c4] opacity-50"
        }`}
      onClick={onClick}
      aria-label={accessibleName}
      aria-current={active ? "true" : undefined}
    />
  );
};

export default CarouselDot;