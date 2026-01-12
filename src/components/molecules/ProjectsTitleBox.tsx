import React from "react";
import Text from "@/components/atoms/Text";

const ProjectsTitleBox: React.FC = () => (
  <div className="absolute top-4 md:top-8 right-0 bg-white rounded-tl-lg md:rounded-tl-xl rounded-bl-lg md:rounded-bl-xl px-4 md:px-6 py-3 md:py-5 shadow-lg whitespace-nowrap">
    <Text variant="caption" className="text-gray-700 font-semibold text-lg md:text-4xl whitespace-nowrap">NUESTROS <span className="font-bold">PROYECTOS</span></Text>
  </div>
);

export default ProjectsTitleBox;
