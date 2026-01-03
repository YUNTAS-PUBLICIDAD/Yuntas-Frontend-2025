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
      const imagenes = [...(prev.imagenes ?? [])];
      const alts = [...(prev.imagenes_alts ?? [])];

      if (file) imagenes[index] = file;
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
