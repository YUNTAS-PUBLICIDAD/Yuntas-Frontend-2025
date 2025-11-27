import React from "react";

interface MapaEmbedProps {
  src: string;
  height?: string;
  className?: string;
}

const MapaEmbed: React.FC<MapaEmbedProps> = ({
  src,
  height = "450",
  className = "",
}) => {
  return (
    <iframe
      src={src}
      width="100%"
      height={height}
      className={`rounded-3xl ${className}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default MapaEmbed;