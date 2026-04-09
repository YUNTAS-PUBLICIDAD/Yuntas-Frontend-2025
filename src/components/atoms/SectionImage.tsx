import React from "react";

type SectionImageType = string | React.FC<any> | React.ComponentType<any>;

interface SectionImageProps {
  src: SectionImageType;
  title?: string;
  alt: string;
  className?: string;
}

const SectionImage: React.FC<SectionImageProps> = ({ src, title, alt, className = "" }) => {
  // Si es un string, renderiza <img>. Si es un componente, renderiza el componente SVG.
  if (typeof src === "string") {
    return <img src={src} alt={alt} title={title || alt} className={`shadow-lg w-full object-cover ${className}`} />;
  }
  const SvgComponent = src as React.ComponentType<any>;
  return <SvgComponent className={`shadow-lg w-full object-cover ${className}`} aria-label={alt} />;
};

export default SectionImage;
