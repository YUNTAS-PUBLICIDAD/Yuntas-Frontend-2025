import React from 'react';
import BeneficioItem from '@/components/molecules/admin/blog/Modal/BeneficioItem';
import ParrafoItem from '@/components/molecules/admin/blog/Modal/ParrafoITem';
import Text from '@/components/atoms/Text';
import { BlogInput } from '@/types/admin/blog';

type ContenidoBlogProp = {
  blog: BlogInput;
  setBlog: React.Dispatch<React.SetStateAction<BlogInput>>;
};

const ContenidoBlog = ({ blog, setBlog }: ContenidoBlogProp) => {

  const handleBeneficioChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const beneficios = [...(blog.beneficios ?? [])];
    beneficios[index] = e.target.value;

    setBlog({
      ...blog,
      beneficios,
    });
  };

  const handleParrafoChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const parrafos = [...(blog.parrafos ?? [])];
    parrafos[index] = e.target.value;

    setBlog({
      ...blog,
      parrafos,
    });
  };

  return (
    <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg border border-yellow-200">

      <small className="text-gray-500 mb-4">
        Párrafo 1 (Introducción) *
      </small>

      <ParrafoItem
        placeholder="Escribe aquí la introducción del blog..."
        name="parrafos[]"
        value={blog.parrafos?.[0] ?? ''}
        onChange={(e) => handleParrafoChange(e, 0)}
      />

      <div className="grid gap-2">
        <Text>Lista Beneficios *</Text>
        <small className="text-gray-500">
          3 beneficios requeridos. Cada beneficio aparecerá como un ítem en la lista.
        </small>

        <BeneficioItem
          title="Beneficio 1 *"
          name="beneficios[]"
          value={blog.beneficios?.[0] ?? ''}
          onChange={(e) => handleBeneficioChange(e, 0)}
        />

        <BeneficioItem
          title="Beneficio 2 *"
          name="beneficios[]"
          value={blog.beneficios?.[1] ?? ''}
          onChange={(e) => handleBeneficioChange(e, 1)}
        />

        <BeneficioItem
          title="Beneficio 3 *"
          name="beneficios[]"
          value={blog.beneficios?.[2] ?? ''}
          onChange={(e) => handleBeneficioChange(e, 2)}
        />
      </div>

      <small className="text-gray-500 mb-4">
        Párrafo 2 (Conclusión/Testimonio) *
      </small>

      <ParrafoItem
        placeholder="Escribe aquí la conclusión o testimonio del blog..."
        name="parrafos[]"
        value={blog.parrafos?.[1] ?? ''}
        onChange={(e) => handleParrafoChange(e, 1)}
      />
    </div>
  );
};

export default ContenidoBlog;
