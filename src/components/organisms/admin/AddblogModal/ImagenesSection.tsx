import ImageUploader from "@/components/molecules/ImageUploader";
import React from 'react'
import Text from "@/components/atoms/Text";

const ImagenesSection = () => {
  return (
    <div className="flex flex-col gap-3 bg-green-50 p-4 sm:p-6 rounded-lg border border-green-200">
      
      <Text className="font-semibold text-green-800">Imágenes</Text>

      {/* Imagen principal */}
      <div className="grid gap-2">
        <Text>Imagen Principal *</Text>
        <ImageUploader 
          name="imagen_principal" altName="imagen_principal_alt" 
          small="Peso maximo :2 MB."/>
      </div>

      {/* Imágenes secundarias */}
      <div className="grid gap-2">
        <Text>Imágenes Secundarias</Text>
        <div className="flex gap-3">
          <ImageUploader name="imagenes[]" altName="imagenes_alts[]" small="Tamaño máximo: 2 MB" />
          <ImageUploader name="imagenes[]" altName="imagenes_alts[]" small="Tamaño máximo: 2 MB" />
          <ImageUploader name="imagenes[]" altName="imagenes_alts[]" small="Tamaño máximo: 2 MB" />
        </div>
      </div>

    </div>
  )
}

export default ImagenesSection;
