import React from 'react';
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';
import { BlogInput } from '@/types/admin/blog';

type BlogSEOSectionProps = {
  blog: BlogInput;
  setBlog: React.Dispatch<React.SetStateAction<BlogInput>>;
};

const BlogSEOSection = ({ blog, setBlog }: BlogSEOSectionProps) => (
  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
    <h3 className="text-lg font-semibold text-blue-800 mb-4">
      Información Principal & SEO
    </h3>

    <div className="flex flex-col gap-4">

      {/* SUBTÍTULO */}
      <div>
        <Input
          textLabel="Subtítulo *"
          placeholder=""
          size="xl"
          rounded="rounded-[5px]"
          value={blog.subtitulo }
          onChange={(e) =>
            setBlog(prev => ({ ...prev, subtitulo: e.target.value }))
          }
        />
        <small className="text-gray-500">
          Máx. 120 caracteres.
        </small>
      </div>

      {/* META TÍTULO */}
      <div>
        <Input
          textLabel="Meta título"
          placeholder="Título optimizado SEO"
          size="xl"
          rounded="rounded-[5px]"
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
      <div>
        <Input
          textLabel="Link (URL amigable) *"
          placeholder="ejm: mi-blog-post"
          size="xl"
          rounded="rounded-[5px]"
          required
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

export default BlogSEOSection;
