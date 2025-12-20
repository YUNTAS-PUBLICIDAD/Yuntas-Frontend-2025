import React, { useState } from "react";

type Props = {
  label: string;
  onChange: (file: File | null, alt: string) => void;
  previewUrl?: string; // para editar
};

const ImageUploader = ({ onChange, previewUrl }: Props) => {
  const [alt, setAlt] = useState("");

  return (
    <div className="flex flex-col gap-2">
      {previewUrl && (
        <img src={previewUrl} className="h-32 object-cover rounded" />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          onChange(e.target.files?.[0] ?? null, alt)
        }
      />

      <input
        type="text"
        value={alt}
        onChange={(e) => {
          setAlt(e.target.value);
          onChange(null, e.target.value);
        }}
        placeholder="Texto ALT"
      />
    </div>
  );
};
