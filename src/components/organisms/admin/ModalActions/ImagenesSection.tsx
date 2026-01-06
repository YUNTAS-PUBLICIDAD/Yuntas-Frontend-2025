import React from "react";
import Text from "@/components/atoms/Text";
import { BlogInput,Blog } from "@/types/admin/blog";
import ImageUpload from "@/components/molecules/admin/ImageUpload";
import { getImg } from "@/utils/getImg";

type ImagenesSectionProps = {
  blog: BlogInput;
  setBlog: React.Dispatch<React.SetStateAction<BlogInput>>;
};
const ImagenesSection = ({ blog, setBlog }: ImagenesSectionProps) => {
  const handleImagenPrincipal = (file: File | null, alt: string) => {
    setBlog(prev => ({
      ...prev,
      imagen_principal: file ?? prev.imagen_principal,
      imagen_principal_alt: alt,
    }));
  };

 const handleImagenSecundaria = (
    index: number,
    file: File | null,
    alt: string
  ) => {
    setBlog(prev => {
      // Creamos copias de los arrays
      const imagenes = [...(prev.imagenes ?? [])];
      const alts = [...(prev.imagenes_alts ?? [])];

      // ASEGURAR ÍNDICES: Si el array es corto (ej: []), lo rellenamos 
      // con 'undefined' hasta llegar al índice que estamos tocando.
      while (imagenes.length <= index) imagenes.push(undefined as any);
      while (alts.length <= index) alts.push("");

      // LÓGICA DE REEMPLAZO EXACTO:
      if (file) {
        // Si hay archivo, lo ponemos en su casilla exacta
        imagenes[index] = file;
      } else {
        // Si se eliminó (file es null), marcamos esa casilla ESPECÍFICA como null.
        // NO usamos splice ni delete, para no mover las otras fotos.
        imagenes[index] = null as any; 
      }

      // Guardamos el texto ALT en su posición exacta
      alts[index] = alt;

      return {
        ...prev,
        imagenes,
        imagenes_alts: alts,
      };
    });
  };

  return (
    <div className="flex flex-col gap-3 bg-green-50 p-4 sm:p-6 rounded-lg border border-green-200">
      <Text className="font-semibold text-green-800">Imágenes</Text>

      {/* Imagen principal */}
      <div className="grid gap-2">
        <Text>Imagen Principal *</Text>
        <ImageUpload
          label="Imagen Principal"
          currentImage={blog.imagen_principal_url ? getImg(blog.imagen_principal_url) : ''}
          altValue={blog.imagen_principal_alt}
          onAltChange={alt =>
            setBlog(prev => ({ ...prev, imagen_principal_alt: alt }))
          }
          onFileChange={file =>
            setBlog(prev => ({ ...prev, imagen_principal: file }))
          }
        />
      </div>

      {/* Imágenes secundarias */}
      <div className="grid gap-2">
        <Text>Imágenes Secundarias</Text>
        <div className="grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map(index => (
            <ImageUpload
              key={index}
              label={`Imagen ${index + 1}`}
              currentImage={blog.imagenes_urls?.[index] ? getImg(blog.imagenes_urls[index]) : ''}
              altValue={blog.imagenes_alts[index] ?? ""}
              onAltChange={alt =>
                handleImagenSecundaria(index, null, alt)
              }
              onFileChange={file =>
                handleImagenSecundaria(index, file, blog.imagenes_alts[index] ?? "")
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagenesSection;
