import React from 'react';
import BeneficioItem from '@/components/molecules/admin/blog/Modal/BeneficioItem';
import ParrafoItem from '@/components/molecules/admin/blog/Modal/ParrafoITem';
import Text from '@/components/atoms/Text';
import { BlogInput } from '@/types/admin/blog';
import { useTextSelection } from '@/hooks/ui/useTextSelection';
import LinkModal from '@/components/molecules/InsertarLink';
import ProductModal from '@/components/molecules/InsertarProducto';

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
  const linkHook = useTextSelection(blog, setBlog);

  return (
    <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg border border-yellow-200">
      <LinkModal
        isOpen={linkHook.isLinkModalOpen}
        onClose={linkHook.close}
        onConfirm={(url) => linkHook.insertLink(url)}
      />

      <ProductModal
        isOpen={linkHook.isProductModalOpen}
        onClose={linkHook.close}
        productos={[]} // ← tu lista real
        onSelect={(producto) => linkHook.insertProduct(producto)}
      />
      <small className="text-gray-500 mb-4">
        Párrafo 1 (Introducción) *
      </small>

      <ParrafoItem
        id={0}
        placeholder="Escribe aquí la introducción del blog..."
        name="parrafos[]"
        value={blog.parrafos?.[0] ?? ''}
        onChange={(e) => handleParrafoChange(e, 0)}
        onUrl={() => linkHook.openLink("parrafos", 0)}
        onProduct={() => linkHook.openProduct("parrafos", 0)}
      />
      
      <div className="grid gap-2">
        <Text>Lista Beneficios *</Text>
        <small className="text-gray-500">
          3 beneficios requeridos. Cada beneficio aparecerá como un ítem en la lista.
        </small>

        <BeneficioItem
          id={0}
          title="Beneficio 1 *"
          name="beneficios[]"
          value={blog.beneficios?.[0] ?? ''}
          onChange={(e) => handleBeneficioChange(e, 0)}
          onUrl={() => linkHook.openLink("beneficios", 0)}
          onProduct={() => linkHook.openProduct("beneficios", 0)}
        />

        <BeneficioItem
          id={1}
          title="Beneficio 2 *"
          name="beneficios[]"
          value={blog.beneficios?.[1] ?? ''}
          onChange={(e) => handleBeneficioChange(e, 1)}
          onUrl={() => linkHook.openLink("beneficios", 1)}
          onProduct={() => linkHook.openProduct("beneficios", 1)}
        />

        <BeneficioItem
          id={2}
          title="Beneficio 3 *"
          name="beneficios[]"
          value={blog.beneficios?.[2] ?? ''}
          onChange={(e) => handleBeneficioChange(e, 2)}
          onUrl={() => linkHook.openLink("beneficios", 2)}
          onProduct={() => linkHook.openProduct("beneficios", 2)}
        />
      </div>

      <small className="text-gray-500 mb-4">
        Párrafo 2 (Conclusión/Testimonio) *
      </small>

      <ParrafoItem
        id={1}
        placeholder="Escribe aquí la conclusión o testimonio del blog..."
        name="parrafos[]"
        value={blog.parrafos?.[1] ?? ''}
        onChange={(e) => handleParrafoChange(e, 1)}
        onUrl={() => linkHook.openLink("parrafos", 1)}
        onProduct={() => linkHook.openProduct("parrafos", 1)}
      />
    </div>
  );
};

export default ContenidoBlog;
