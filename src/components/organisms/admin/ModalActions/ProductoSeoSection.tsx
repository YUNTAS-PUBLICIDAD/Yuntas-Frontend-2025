import React from 'react';
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';
import { BlogInput } from '@/types/admin/blog';
import { useProductos } from '@/hooks/useProductos';
import { useEffect } from 'react';

type BlogSEOSectionProps = {
  blog: BlogInput;
  setBlog: React.Dispatch<React.SetStateAction<BlogInput>>;
};

const BlogSEOSection = ({ blog, setBlog }: BlogSEOSectionProps) => {
  const { productos, getProductos } = useProductos();

  useEffect(() => {
    getProductos(100);
  }, [getProductos]);
  console.log(productos)
  return (
    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
      <h3 className="text-lg font-semibold text-blue-800 mb-4">
        Información Principal & SEO
      </h3>

      <div className="flex flex-col gap-4">
        {/* Product Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Producto asociado *
            <span className="text-red-500 ml-1">*</span>
          </label>
            <select
              className="px-3 py-2 bg-white border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-[#23C1DE] focus:border-transparent transition-all w-full"
              value={blog.categorias?.[0]?.id || ''}
              onChange={(e) => {
                const selectedId = Number(e.target.value);
                const selectedProducto = productos.find(p => p.id === selectedId);
                console.log(selectedProducto.id)
                console.log(selectedProducto.name)
                console.log(selectedProducto.slug)
                setBlog(prev => ({
                  ...prev,
                  categorias: selectedProducto ? [{
                    id: selectedProducto.id,
                    name: selectedProducto.name,
                    slug: selectedProducto.slug
                  }] : []
                }));
              }}
              required
            >
              <option value="">-- Selecciona un producto --</option>
              {productos.map((producto) => (
                <option key={producto.id} value={producto.id}>
                  {producto.name}
                </option>
              ))}
            </select>
        </div>

        {/* Subtítulo */}
        <div className='w-full'>
          <Input
            borderColor='border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#23C1DE] focus:border-transparent transition-all'
            name='subtitulo'
            textLabel="Subtítulo *"
            placeholder=""
            size="xxl"
            rounded="rounded-[5px]"
            value={blog.subtitulo || ""}
            onChange={(e) =>
              setBlog(prev => ({ ...prev, subtitulo: e.target.value }))
            }
          />
          <small className="text-gray-500">
            Máx. 120 caracteres.
          </small>
        </div>

        {/* META TÍTULO */}
        <div className='w-full'>
          <Input
            borderColor='border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#23C1DE] focus:border-transparent transition-all'
            textLabel="Meta título"
            placeholder="Título optimizado SEO"
            size="xxl"
            rounded="rounded-[5px]"
            name='meta_titulo'
            value={blog.etiqueta.meta_titulo ?? ""}
            onChange={(e) =>
              setBlog(prev => ({
                ...prev,
                etiqueta: {
                  ...prev.etiqueta,
                  meta_titulo: e.target.value,
                },
              }))
            }
          />
          <small className="text-gray-500">
            Máx. 70 caracteres.
          </small>
        </div>

        {/* META DESCRIPCIÓN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meta descripción
          </label>
          <TextArea
            rows={2}
            className='border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23C1DE] focus:border-transparent transition-all'
            name='meta_descripcion'
            placeholder="Descripción optimizada SEO"
            value={blog.etiqueta.meta_descripcion ?? ""}
            onChange={(e) =>
              setBlog(prev => ({
                ...prev,
                etiqueta: {
                  ...prev.etiqueta,
                  meta_descripcion: e.target.value,
                },
              }))
            }
          />
          <small className="text-gray-500">
            Máx. 160 caracteres.
          </small>
        </div>

        {/* TÍTULO (OBLIGATORIO) */}
        <div className='w-full'>
          <Input
            borderColor='border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#23C1DE] focus:border-transparent transition-all'
            textLabel="Link (URL amigable) *"
            placeholder="ejm: mi-blog-post"
            size="xxl"
            rounded="rounded-[5px]"
            required
            name='titulo'
            value={blog.titulo}
            onChange={(e) =>
              setBlog(prev => ({ ...prev, titulo: e.target.value }))
            }
          />
          <small className="text-gray-500">
            Campo obligatorio.
          </small>
        </div>
      </div>
    </div>
  );
};

export default BlogSEOSection;