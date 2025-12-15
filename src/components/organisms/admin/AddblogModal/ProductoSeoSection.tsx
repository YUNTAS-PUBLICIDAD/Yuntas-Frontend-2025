import React from 'react';
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';
import Select from '@/components/atoms/Select';
import { productosData } from '@/data/productosData';

const productos: string[] = productosData.map(e => e.nombre);
const productosOptions = productosData.map(producto => ({
  value: producto.id,      // ✅ Envía el ID numérico
  label: producto.nombre   // ✅ Muestra el nombre
}));
const BlogSEOSection = () => (
  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
    <h3 className="text-lg font-semibold text-blue-800 mb-4">
      Información Principal & SEO
    </h3>

    <div className="flex flex-col gap-4">
      {/* <div>
        <Select
          options={productosOptions}
          textLabel="Producto *"
          name="categorias[]"/>
        <small className='text-gray-500 '>Selecciona el producto relacionado con este blog. Requerido.</small>
      </div> */}
      <div>
        <Input
          textLabel="Subtitulo *"
          placeholder=""
          size="xl"
          rounded='rounded-[5px] '
          name="subtitulo"/>
          <small className='text-gray-500 '>Máx. 120 caracteres (letras, números y espacios).</small>
      </div>
      <div>
        <Input
          textLabel="Meta título"
          placeholder="Titulo obtimizado para SEO "
          size="xl"
          rounded='rounded-[5px] '
          name="meta_titulo"/>
          <small className='text-gray-500 '>Máx. 70 caracteres (letras, números y espacios).</small>
      </div>
      {/* meta descripcion */}
      <div className="">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Meta descripción
        </label>
        <TextArea 
          placeholder="Descripción optimazada SEO"
          name="meta_descripcion"
          rows={2}/>
        <small className='text-gray-500 '>Máx. 160 caracteres (letras, números y espacios).</small>
      </div>
      {/* link  */}
      <div>
        <Input
          textLabel="Link (URL amigable)"
          placeholder="ejm : mi-blog-post"
          size="xl"
          name="titulo"
          className='border-1 border-gray-400'
          rounded='rounded-[5px] '
          required/>
          <small className='text-gray-500 '>Escribe solo letras y guiones. Máx. 255 letras o números.</small>
      </div>
    </div>
  </div>
);

export default BlogSEOSection;
