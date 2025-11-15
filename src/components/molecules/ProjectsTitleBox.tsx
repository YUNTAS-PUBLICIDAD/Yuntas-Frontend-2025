import React from "react";
import Text from "@/components/atoms/Text";

const ProjectsTitleBox: React.FC = () => (
  <div className="absolute top-8 right-0 bg-white rounded-tl-xl rounded-bl-xl px-6 py-5 shadow-lg whitespace-nowrap">
    <Text variant="caption" className="text-gray-700 font-semibold text-2xl md:text-4xl whitespace-nowrap">NUESTROS <span className="font-bold">PROYECTOS</span></Text>
  </div>
);

export default ProjectsTitleBox;
