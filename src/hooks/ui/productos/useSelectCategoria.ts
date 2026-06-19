import { useEffect } from 'react';
import { Producto } from '@/types/admin/producto';

export const useSelectCategorias = (
  categoriasActivas: string[],
  setListaProductos: React.Dispatch<React.SetStateAction<Producto[]>>,
  allProductos: Producto[]
) => {
  useEffect(() => {
    // Sin selección → mostrar todos
    if (categoriasActivas.length === 0) {
      setListaProductos(allProductos);
      return;
    }

    // Filtrar por cualquiera de las categorías seleccionadas
    const filtrados = allProductos.filter((p) =>
      categoriasActivas.includes(p.category_name || '')
    );
    setListaProductos(filtrados);
  }, [categoriasActivas, allProductos, setListaProductos]);
};
